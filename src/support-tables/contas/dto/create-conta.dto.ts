import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tipo: string;

  @ApiProperty({ required: false })
  ativo?: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  conta: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  agencia: string;

  @IsNotEmpty()
  @ApiProperty()
  Banco: Prisma.BancoCreateNestedOneWithoutContaInput;

  @IsNotEmpty()
  @ApiProperty()
  Empresa: Prisma.EmpresaCreateNestedOneWithoutContaInput;

  @IsNotEmpty()
  @ApiProperty()
  Usuario: Prisma.UsuarioCreateNestedOneWithoutContaInput;
}
