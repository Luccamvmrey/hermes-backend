import { $Enums, Pessoa } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class PessoaEntity implements Pessoa {
  @ApiProperty()
  id: number;

  @ApiProperty()
  razao: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  numero: string;

  @ApiProperty({ required: false })
  complemento: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  cidade: string;

  @ApiProperty()
  uf: string;

  @ApiProperty()
  cep: string;

  @ApiProperty({ required: false })
  diaPagamento: number;

  @ApiProperty({ required: false })
  obs: string;

  @ApiProperty({ required: false })
  isFornecedor: boolean;

  @ApiProperty({ required: false })
  isCliente: boolean;

  @ApiProperty({ required: false })
  isFabricante: boolean;

  @ApiProperty({ required: false })
  isTransportadora: boolean;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  dataCadastro: Date;

  @ApiProperty()
  idEmpresa: number;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  telefone: string;

  @ApiProperty({ required: false })
  tipoFornecedor: $Enums.TipoFornecedor;

  @ApiProperty({ required: false })
  idBanco: number;

  @ApiProperty({ required: false })
  agencia: string;

  @ApiProperty({ required: false })
  contaCorrente: string;

  @ApiProperty({ required: false })
  chavePix: string;
}