import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AddPermissaoDto } from './dto/add-permissao.dto';

@Injectable()
export class PermissoesService {
  constructor(private readonly databaseService: DatabaseService) {}

  addPermissao(userId: number, addPermissaoDto: AddPermissaoDto) {
    return this.databaseService.permissoesUsuario.create({
      data: {
        ...addPermissaoDto,
        Usuario: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
