import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PagamentosService {
  constructor(private readonly databaseService: DatabaseService) {}

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
    return this.databaseService.pagamento.update({
      where: {
        id,
      },
      data,
    });
  }
}
