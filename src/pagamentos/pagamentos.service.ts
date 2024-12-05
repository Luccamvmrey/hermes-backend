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

  async updateValorPago(id: number, valorPago: number) {
    const pagamentoAntigo = await this.findOne(id);
    const valorAtualizado = Number(pagamentoAntigo.valorPago) + valorPago;

    const pagamento = await this.update(id, {
      valorPago: valorAtualizado,
      statusPagamento:
        valorAtualizado === Number(pagamentoAntigo.valorParcela) ? 'Pago' : 'Parcial',
    });

    await this.contasPagarService.updateValorPago(pagamento.idContaPagar);

    return pagamento;
  }
}
