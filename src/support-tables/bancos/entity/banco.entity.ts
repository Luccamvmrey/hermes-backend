import { Banco } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BancoEntity implements Banco {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  ativo: boolean;
}
