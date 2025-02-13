import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ContasPagarService } from '../contas-pagar/contas-pagar.service';
import { Prisma } from '@prisma/client';
import { UsuariosService } from '../../user/usuarios/usuarios.service';
import { PayValueDto } from './dto/pay-value.dto';

@Injectable()
export class PagamentosService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usuariosService: UsuariosService,
    @Inject(forwardRef(() => ContasPagarService))
    private readonly contasPagarService: ContasPagarService,
  ) {}

  private getPagamentoInclude() {
    return {
      ContaPagar: {
        include: {
          Pessoa: { include: { Banco: true } },
          FormaPagamento: true,
          Pagamento: true,
          SubConta: true,
          ContaContabil: true,
          Arquivo: true,
          Usuario: true,
          CentroCusto: true,
        },
      },
      Autorizante: true,
      Pagador: true,
      Arquivo: true,
    };
  }

  async create(data: Prisma.PagamentoCreateInput) {
    return this.databaseService.pagamento.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.pagamento.findMany({
      include: this.getPagamentoInclude(),
    });
  }

  async findAllByUser(userId: number) {
    const user = await this.usuariosService.findOne(userId);

    const hoje = new Date();
    const dataInicio = new Date();
    dataInicio.setDate(hoje.getDate() - 60); // Últimos 60 dias
    const dataFim = new Date();
    dataFim.setDate(hoje.getDate() + 30); // Próximos 30 dias

    // Cláusula base para pagamentos visíveis ao usuário
    const whereClause: any = {
      ContaPagar: {
        Empresa: {
          EmpresaUsuario: {
            some: { idUsuario: userId },
          },
        },
      },
      OR: [
        { dataVencimento: { gte: dataInicio, lte: dataFim } }, // Pagamentos nos últimos 60 e próximos 30 dias
        {
          statusPagamento: { not: 'Pago' },
          dataVencimento: { lt: dataInicio },
        }, // Pagamentos atrasados e não pagos
      ],
    };

    // Se for um usuário gerenciado, filtra apenas pela gerência
    if (user?.idGerencia && !user?.acessoAreasExternas) {
      Object.assign(whereClause.ContaPagar, {
        Usuario: { idGerencia: user.idGerencia },
      });
    }

    // Se for um SOLICITANTE, exibe apenas seus próprios pagamentos
    if (user?.userRole === 'SOLICITANTE') {
      Object.assign(whereClause.ContaPagar, { idUsuario: userId });
    }

    // Se for um CAIXA ou AUTORIZANTE, filtra pelo valor máximo permitido
    if (
      ['CAIXA', 'AUTORIZANTE'].includes(user?.userRole) &&
      user?.valorMaximoOperacoes != null
    ) {
      Object.assign(whereClause, {
        valorParcela: { lte: user.valorMaximoOperacoes },
      });
    }

    // Executa a consulta com paginação para evitar retorno excessivo
    return this.databaseService.pagamento.findMany({
      where: whereClause,
      include: {
        ContaPagar: {
          include: {
            Pessoa: { include: { Banco: true } },
            FormaPagamento: true,
            Pagamento: true,
            SubConta: true,
            ContaContabil: true,
            Arquivo: true,
            Usuario: { include: { Superior: true } },
            CentroCusto: true,
            Empresa: true,
          },
        },
        Autorizante: true,
        Pagador: true,
        Arquivo: true,
      },
      orderBy: { dataVencimento: 'asc' }, // Ordena por vencimento
    });
  }

  async findOne(id: number) {
    return this.databaseService.pagamento.findUnique({
      where: {
        id,
      },
      include: {
        ContaPagar: {
          include: {
            Pessoa: true,
            FormaPagamento: true,
          },
        },
      },
    });
  }

  async update(id: number, data: Prisma.PagamentoUpdateInput) {
    const pagamento = await this.databaseService.pagamento.update({
      where: {
        id,
      },
      data,
    });

    if (data.valorParcela) {
      await this.contasPagarService.updateValorTotal(pagamento.idContaPagar);
    }

    return pagamento;
  }

  async updateValorPago(
    id: number,
    payValueDto: PayValueDto | Prisma.PagamentoUpdateInput,
  ) {
    const pagamentoAntigo = await this.findOne(id);
    const valorAtualizado =
      Number(pagamentoAntigo.valorPago) + Number(payValueDto.valorPago);

    const pagamento = await this.update(id, {
      valorPago: valorAtualizado,
      statusPagamento:
        valorAtualizado >= Number(pagamentoAntigo.valorParcela)
          ? 'Pago'
          : 'Parcial',
      dataPagamento:
        valorAtualizado >= Number(pagamentoAntigo.valorParcela)
          ? new Date()
          : null,
      percentualJuros: payValueDto.percentualJuros ?? null,
      Pagador: payValueDto.Pagador,
      Conta: payValueDto.Conta,
    });

    await this.contasPagarService.updateValorPago(pagamento.idContaPagar);

    return pagamento;
  }

  async remove(id: number) {
    const pagamento = await this.findOne(id);
    if (
      pagamento.statusPagamento === 'Pago' ||
      pagamento.statusPagamento === 'Parcial'
    ) {
      throw new Error(
        'Não é possível excluir um pagamento que já foi pago ou parcialmente pago',
      );
    }

    await this.databaseService.pagamento.delete({
      where: {
        id,
      },
    });

    await this.contasPagarService.updateValorTotal(pagamento.idContaPagar);
    await this.contasPagarService.updateLoteParcelas(pagamento.idContaPagar);

    return pagamento;
  }
}
