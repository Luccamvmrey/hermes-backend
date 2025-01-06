import { $Enums, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePessoaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  razao: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endereco: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  numero: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  complemento?: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cep: string;

  @ApiProperty({ required: false })
  diaPagamento?: number | null;

  @ApiProperty({ required: false })
  obs?: string | null;

  @ApiProperty({ required: false })
  isFornecedor?: boolean;

  @ApiProperty({ required: false })
  isCliente?: boolean | null;

  @ApiProperty({ required: false })
  isFabricante?: boolean | null;

  @ApiProperty({ required: false })
  isTransportadora?: boolean | null;

  @ApiProperty({ required: false })
  ativo?: boolean;

  @ApiProperty({ required: false })
  dataCadastro?: Date | string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  telefone?: string | null;

  @ApiProperty({ required: false })
  ContaPagar?: Prisma.ContaPagarCreateNestedManyWithoutPessoaInput;

  @IsNotEmpty()
  @ApiProperty()
  Empresa: Prisma.EmpresaCreateNestedOneWithoutPessoaInput;

  @ApiProperty({ required: false })
  Banco: Prisma.BancoCreateNestedOneWithoutPessoaInput;

  @ApiProperty({ required: false })
  agencia?: string

  @ApiProperty({ required: false })
  tipoFornecedor?: $Enums.TipoFornecedor | null;

  @ApiProperty({ required: false })
  contaCorrente?: string;

  @ApiProperty({ required: false })
  chavePix?: string;
}
