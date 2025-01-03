import { Prisma } from "@prisma/client";
import { IsNumber } from "class-validator";

export class PayValueDto {
    @IsNumber()
    valorPago: number;

    @IsNumber()
    percentualJuros: number;

    Pagador: Prisma.UsuarioCreateNestedOneWithoutParcelasPagasInput;
}