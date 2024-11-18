import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateGerenciaDto } from './dto/create-gerencia.dto';
import { UpdateGerenciaDto } from './dto/update-gerencia.dto';

@Injectable()
export class GerenciasService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateGerenciaDto) {
    return this.databaseService.gerencia.create({
      data,
    });
  }

  async findAll(nome?: string) {
    if (nome) {
      return this.databaseService.gerencia.findMany({ where: { nome } });
    }
    return this.databaseService.gerencia.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.gerencia.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateGerenciaDto) {
    return this.databaseService.gerencia.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.gerencia.delete({
      where: {
        id,
      },
    });
  }
}
