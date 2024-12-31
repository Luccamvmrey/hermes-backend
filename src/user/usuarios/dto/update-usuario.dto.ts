import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @ApiProperty({ required: false })
  usuarioData: Prisma.UsuarioUpdateInput;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  empresas?: number[];
}
