import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFormaPagamentoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @ApiProperty({ required: false })
  ativo?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  parcelas: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  intervalo: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  taxa: number | string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  entrada: number | string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tipo: string;

  @ApiProperty({ required: false })
  dias?: number | null;

  @ApiProperty({ required: false })
  ContaPagar?: Prisma.ContaPagarCreateNestedManyWithoutFormaPagamentoInput;
}
