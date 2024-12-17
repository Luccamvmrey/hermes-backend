import { Injectable } from '@nestjs/common';
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class ArquivosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(fileName: string, idContaPagar: number) {
    return this.databaseService.arquivo.create({
      data: {
        filename: fileName,
        ContaPagar: {
          connect: {
            id: idContaPagar
          }
        }
      }
    });
  }
}
