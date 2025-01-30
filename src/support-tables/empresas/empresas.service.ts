import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateEmpresaDto) {
    return this.databaseService.empresa.create({
      data,
    });
  }

  async findAll(cnpj?: string, fantasia?: string, razao?: string) {
    const where = cnpj
      ? { cnpj }
      : fantasia
        ? { fantasia }
        : razao
          ? { razao }
          : {};
    return this.databaseService.empresa.findMany({ where });
  }

  async findOne(id: number) {
    return this.databaseService.empresa.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByCnpj(cnpj: string) {
    const formattedCnpj = this.formatCnpj(cnpj);
    const empresa = await this.databaseService.empresa.findUnique({
      where: {
        cnpj: formattedCnpj,
      },
    });

    if (!empresa) throw new NotFoundException();

    return empresa;
  }

  async update(id: number, data: UpdateEmpresaDto) {
    return this.databaseService.empresa.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.empresa.delete({
      where: {
        id,
      },
    });
  }

  formatCnpj(cnpj: string) {
    return cnpj
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}
