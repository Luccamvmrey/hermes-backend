import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreatePessoaDto) {
    return this.databaseService.pessoa.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.pessoa.findMany({
      include: {
        Banco: true,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.pessoa.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdatePessoaDto) {
    return this.databaseService.pessoa.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.pessoa.delete({
      where: {
        id,
      },
    });
  }
}
