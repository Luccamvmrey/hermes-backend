import { forwardRef, Inject, Injectable } from "@nestjs/common";
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
    const pagamento = await this.databaseService.pagamento.update({
      where: {
        id,
      },
      data,
    });

    if (data.valorParcela) {
      await this.contasPagarService.updateValorTotal(pagamento.idContaPagar);
    }
  }
}
