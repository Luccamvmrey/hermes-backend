import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateFormaPagamentoDto } from './dto/create-forma-pagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-forma-pagamento.dto';

@Injectable()
export class FormasPagamentoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateFormaPagamentoDto) {
    return this.databaseService.formaPagamento.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.formaPagamento.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.formaPagamento.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateFormaPagamentoDto) {
    return this.databaseService.formaPagamento.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.formaPagamento.delete({
      where: {
        id,
      },
    });
  }
}
