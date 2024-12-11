import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Injectable()
export class ContasService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateContaDto) {
    return this.databaseService.conta.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.conta.findMany({
      include: {
        Usuario: true,
        Empresa: true,
        Banco: true,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.conta.findUnique({
      where: {
        id,
      },
      include: {
        Banco: true,
      },
    });
  }

  async update(id: number, data: UpdateContaDto) {
    return this.databaseService.conta.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.conta.delete({
      where: {
        id,
      },
    });
  }
}
