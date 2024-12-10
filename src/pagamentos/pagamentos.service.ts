import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ContasPagarService } from '../contas-pagar/contas-pagar.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PagamentosService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => ContasPagarService))
    private readonly contasPagarService: ContasPagarService,
  ) {}

  async create(data: Prisma.PagamentoCreateInput) {
    return this.databaseService.pagamento.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.pagamento.findMany({
      include: {
        ContaPagar: {
          include: {
            Pessoa: true,
            FormaPagamento: true,
            Pagamento: true,
            SubConta: true,
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

  async updateValorPago(id: number, data: Prisma.PagamentoUpdateInput) {
    const pagamentoAntigo = await this.findOne(id);
    const valorAtualizado = Number(pagamentoAntigo.valorPago) + Number(data.valorPago);

    const pagamento = await this.update(id, {
      valorPago: valorAtualizado,
      statusPagamento:
        valorAtualizado === Number(pagamentoAntigo.valorParcela)
          ? 'Pago'
          : 'Parcial',
      dataPagamento:
        valorAtualizado === Number(pagamentoAntigo.valorParcela)
          ? new Date()
          : null,
      Pagador: data.Pagador
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
