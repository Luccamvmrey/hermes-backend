import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { $Enums } from "@prisma/client";

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

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  idGerencia: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  empresas?: number[];
}
