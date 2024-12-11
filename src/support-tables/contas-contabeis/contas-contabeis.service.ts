import { Injectable } from '@nestjs/common';
import { CreateContaContabilDto } from './dto/create-conta-contabil.dto';
import { UpdateContaContabilDto } from './dto/update-conta-contabil.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ContasContabeisService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateContaContabilDto) {
    return this.databaseService.contaContabil.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.contaContabil.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.contaContabil.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateContaContabilDto) {
    return this.databaseService.contaContabil.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.contaContabil.delete({
      where: {
        id,
      },
    });
  }
}
