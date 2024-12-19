import { ApiProperty } from "@nestjs/swagger";
import {CentroCusto} from "@prisma/client";

export class CentroCustoEntity implements CentroCusto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    ativo: boolean;
}
