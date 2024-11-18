import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpresaUsuarioService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.EmpresaUsuarioCreateInput) {
    return this.databaseService.empresaUsuario.create({
      data,
    });
  }
}
