import { Injectable } from '@nestjs/common';
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class ArquivosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(fileName: string, originalName: string, idContaPagar: number) {
    return this.databaseService.arquivo.create({
      data: {
        filename: fileName,
        originalName: originalName,
        ContaPagar: {
          connect: {
            id: idContaPagar
          }
        }
      }
    });
  }
}
