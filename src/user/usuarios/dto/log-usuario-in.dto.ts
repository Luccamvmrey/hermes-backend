import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogUsuarioInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senha: string;
}
