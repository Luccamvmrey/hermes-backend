import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { UpdatePermissoesDto } from './dto/update-permissoes.dto';

@Injectable()
export class PermissoesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async updatePermissoes(
    userId: number,
    updatePermissoesDto: UpdatePermissoesDto,
  ) {
    await this.databaseService.permissoesUsuario.deleteMany({
      where: { idUsuario: userId },
    });

    return this.databaseService.permissoesUsuario.createMany({
      data: updatePermissoesDto.pages.map((page) => {
        return { page, idUsuario: userId };
      }),
    });
  }
}
