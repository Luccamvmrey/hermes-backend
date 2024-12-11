import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGerenciaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @ApiProperty({ required: false })
  ativo?: boolean;
}
