import { Injectable } from '@nestjs/common';
import { CreateCentroCustoDto } from './dto/create-centro-custo.dto';
import { UpdateCentroCustoDto } from './dto/update-centro-custo.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CentroCustoService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(data: CreateCentroCustoDto) {
        return this.databaseService.centroCusto.create({
            data,
        });
    }

    async findAll() {
        return this.databaseService.centroCusto.findMany();
    }

    async findOne(id: number) {
        return this.databaseService.centroCusto.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: number, data: UpdateCentroCustoDto) {
        return this.databaseService.centroCusto.update({
            where: {
                id,
            },
            data,
        });
    }

    async remove(id: number) {
        return this.databaseService.centroCusto.delete({
            where: {
                id,
            },
        });
    }
}