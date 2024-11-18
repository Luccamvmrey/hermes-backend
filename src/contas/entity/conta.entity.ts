import { Conta } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ContaEntity implements Conta {
  @ApiProperty()
  descricao: string;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  conta: string;

  @ApiProperty()
  agencia: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  idBanco: number;

  @ApiProperty()
  idEmpresa: number;

  @ApiProperty()
  idUsuario: number;
}