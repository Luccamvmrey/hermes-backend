import { ContaPagar } from "@prisma/client";
import { Decimal } from '@prisma/client/runtime/library';
import { ApiProperty } from "@nestjs/swagger";

export class ContasPagarEntity implements ContaPagar {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nfe: number;

  @ApiProperty()
  serie: number;

  @ApiProperty()
  criadoEm: Date;

  @ApiProperty()
  doc: string;

  @ApiProperty()
  valor: Decimal;

  @ApiProperty()
  dataVencimento: Date;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  percentualJuros: Decimal;

  @ApiProperty()
  percentualDesconto: Decimal;

  @ApiProperty()
  valorPago: Decimal;

  @ApiProperty()
  situacao: string;

  @ApiProperty()
  flag: boolean;

  @ApiProperty()
  codBarras: string;

  @ApiProperty()
  especie: string;

  @ApiProperty()
  idFornecedor: number;

  @ApiProperty()
  idUsuario: number;

  @ApiProperty()
  idEmpresa: number;

  @ApiProperty()
  idFormaPagamento: number;

  @ApiProperty()
  idContaContabil: number;

  @ApiProperty()
  idSubConta: number;

  @ApiProperty()
  dataEmissao: Date;
}
