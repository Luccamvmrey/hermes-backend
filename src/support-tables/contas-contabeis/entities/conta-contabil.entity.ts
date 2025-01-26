import { ContaContabil } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ContaContabilEntity implements ContaContabil {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  ativo: boolean;
}
