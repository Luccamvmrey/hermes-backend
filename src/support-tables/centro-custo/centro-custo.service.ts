import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CentroCustoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.CentroCustoCreateInput) {
    return this.databaseService.centroCusto.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.centroCusto.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.centroCusto.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.CentroCustoUpdateInput) {
    return this.databaseService.centroCusto.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.centroCusto.delete({
      where: {
        id,
      },
    });
  }
}
