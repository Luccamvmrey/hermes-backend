import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class EmpresaUsuarioService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number, empresaId: number) {
    return this.databaseService.empresaUsuario.create({
      data: {
        Usuario: { connect: { id: userId } },
        Empresa: {
          connect: { id: empresaId },
        },
      },
    });
  }

  async removeAll(userId: number) {
    return this.databaseService.empresaUsuario.deleteMany({
      where: { idUsuario: userId },
    });
  }
}
