import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContasPagarDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  nfe: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  serie: number;

  @ApiProperty({ required: false })
  criadoEm?: Date | string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  doc: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  valor: number | string;

  @IsNotEmpty()
  @ApiProperty()
  dataVencimento: Date | string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @ApiProperty({ required: false })
  percentualJuros: number | string;

  @ApiProperty({ required: false })
  percentualDesconto: number | string;

  @ApiProperty({ required: false })
  valorPago: number | string;

  @ApiProperty()
  situacao: string;

  @ApiProperty({ required: false })
  flag: boolean;

  @ApiProperty({ required: false })
  codBarras: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  especie: string;

  @IsNotEmpty()
  @ApiProperty()
  dataEmissao: Date | string;

  @IsNotEmpty()
  @ApiProperty()
  Empresa: Prisma.EmpresaCreateNestedOneWithoutContaPagarInput;

  @IsNotEmpty()
  @ApiProperty()
  FormaPagamento: Prisma.FormaPagamentoCreateNestedOneWithoutContaPagarInput;

  @IsNotEmpty()
  @ApiProperty()
  Pessoa: Prisma.PessoaCreateNestedOneWithoutContaPagarInput;

  @IsNotEmpty()
  @ApiProperty()
  Usuario: Prisma.UsuarioCreateNestedOneWithoutContaPagarInput;

  @IsNotEmpty()
  @ApiProperty()
  ContaContabil: Prisma.ContaContabilCreateNestedOneWithoutContaPagarInput

  @IsNotEmpty()
  @ApiProperty()
  SubConta: Prisma.SubContaCreateNestedOneWithoutContaPagarInput

  @ApiProperty({ required: false })
  Pagamento?: Prisma.PagamentoCreateNestedManyWithoutContaPagarInput;
}
