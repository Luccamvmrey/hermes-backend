import { Injectable } from '@nestjs/common';
import { CreateSubContaDto } from './dto/create-sub-conta.dto';
import { UpdateSubContaDto } from './dto/update-sub-conta.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SubContasService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(data: CreateSubContaDto) {
    console.log(data);
    return this.databaseService.subConta.create({
      data,
    });
  }

  findAll() {
    return this.databaseService.subConta.findMany({
      include: {
        ContaContabil: true,
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.subConta.findUnique({
      where: {
        id,
      },
      include: {
        ContaContabil: true,
      },
    });
  }

  update(id: number, data: UpdateSubContaDto) {
    return this.databaseService.subConta.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.databaseService.subConta.delete({
      where: {
        id,
      },
    });
  }
}
