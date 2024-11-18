import { FormaPagamento } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ApiProperty } from "@nestjs/swagger";

export class FormaPagamentoEntity implements FormaPagamento {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  parcelas: number;

  @ApiProperty()
  intervalo: number;

  @ApiProperty()
  taxa: Decimal;

  @ApiProperty()
  entrada: Decimal;

  @ApiProperty()
  tipo: string;

  @ApiProperty({ required: false })
  dias: number;
}