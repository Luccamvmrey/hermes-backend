import { SubConta } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SubContaEntity implements SubConta {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  idContaContabil: number;
}
