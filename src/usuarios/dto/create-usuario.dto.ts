import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  empresas?: number[];
}
