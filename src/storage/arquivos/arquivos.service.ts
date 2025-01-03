import { Injectable } from '@nestjs/common';
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class ArquivosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    fileName: string,
    originalName: string,
    resource: 'CONTA-PAGAR' | 'PAGAMENTO', 
    idResource: number
  ) {
    const fieldName = resource === 'CONTA-PAGAR' ? 'ContaPagar' : 'Pagamento';

    return this.databaseService.arquivo.create({
      data: {
        filename: fileName,
        originalName: originalName,
        [fieldName]: {
          connect: {
            id: idResource
          }
        }
      }
    });
  }
}
