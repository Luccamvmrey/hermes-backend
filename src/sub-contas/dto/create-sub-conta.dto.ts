import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubContaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @ApiProperty({ required: false })
  ativo?: boolean;

  @ApiProperty({ required: false })
  ContaContabil: Prisma.ContaContabilCreateNestedOneWithoutSubContaInput;
}
