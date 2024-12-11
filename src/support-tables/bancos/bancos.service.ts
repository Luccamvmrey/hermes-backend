import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Injectable()
export class BancosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateBancoDto) {
    return this.databaseService.banco.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.banco.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.banco.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateBancoDto) {
    return this.databaseService.banco.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.banco.delete({
      where: {
        id,
      },
    });
  }
}
