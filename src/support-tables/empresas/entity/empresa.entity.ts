import { Empresa } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class EmpresaEntity implements Empresa {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fantasia: string;

  @ApiProperty()
  razao: string;

  @ApiProperty({ required: false })
  tipo: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty({ required: false })
  ie: string;

  @ApiProperty({ required: false })
  im: string;

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

  @ApiProperty()
  fone: string;

  @ApiProperty({ required: false })
  site: string;

  @ApiProperty()
  fundacao: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  idUsuario: number;

  @ApiProperty({ required: false })
  apelido: string;
}