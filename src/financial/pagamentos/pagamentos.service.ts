import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ContasPagarService } from '../contas-pagar/contas-pagar.service';
import { Prisma } from '@prisma/client';
import { PaginationDto } from '../../common/pagination/dto/pagination.dto';
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

  async create(data: Prisma.PagamentoCreateInput) {
    return this.databaseService.pagamento.create({
      data,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { offset, limit } = paginationDto;

    return this.databaseService.pagamento.findMany({
      skip: offset,
      take: limit,
      include: {
        ContaPagar: {
          include: {
            Pessoa: true,
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
      },
    });
  }

  async findAllByUser(userId: number) {
    const user = await this.usuariosService.findOne(userId);

    // Construindo a cláusula inicial
    let whereClause: any = {
      ContaPagar: {
        Empresa: {
          EmpresaUsuario: {
            some: {
              idUsuario: userId,
            },
          },
        },
      },
    };

    // Adicionando o filtro de gerência, se aplicável
    if (user?.idGerencia && !user?.acessoAreasExternas) {
      whereClause.ContaPagar.Usuario = {
        idGerencia: user?.idGerencia, // Apenas contas criadas por usuários na mesma gerência
      };
    }

    // Condição para usuários do tipo SOLICITANTE
    if (user?.userRole === 'SOLICITANTE') {
      whereClause.ContaPagar = {
        ...whereClause.ContaPagar,
        idUsuario: userId, // Apenas pagamentos criados pelo usuário
      };
    }

    // Condição para usuários do tipo CAIXA ou AUTORIZANTE
    if (
      ['CAIXA', 'AUTORIZANTE'].includes(user?.userRole) &&
      user?.valorMaximoOperacoes != null
    ) {
      whereClause = {
        ...whereClause,
        valorParcela: { lte: user?.valorMaximoOperacoes },
      };
    }

    // Query final
    return this.databaseService.pagamento.findMany({
      where: whereClause,
      include: {
        ContaPagar: {
          include: {
            Pessoa: true,
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
      },
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
    let pagamento = await this.databaseService.pagamento.update({
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

  async updateValorPago(id: number, payValueDto: PayValueDto | Prisma.PagamentoUpdateInput) {
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
