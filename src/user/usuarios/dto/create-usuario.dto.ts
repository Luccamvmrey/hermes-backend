import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { $Enums, Prisma } from "@prisma/client";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @IsNotEmpty()
  @ApiProperty()
  userRole: $Enums.UserRole;


  @IsOptional()
  @ApiProperty()
  Gerencia: Prisma.GerenciaCreateNestedOneWithoutUsuarioInput;

  @IsNumber()
  @ApiProperty()
  valorMaximoOperacoes: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  empresas?: number[];
}
