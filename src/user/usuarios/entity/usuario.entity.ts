import { $Enums, Prisma, Usuario } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioEntity implements Usuario {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  senha: string;

  @ApiProperty({ required: false })
  sessionToken: string;

  @ApiProperty()
  userRole: $Enums.UserRole;

  @ApiProperty()
  valorMaximoOperacoes: Prisma.Decimal | null

  @ApiProperty()
  permitirAutorizacaoPropria: boolean;

  @ApiProperty()
  acessoAreasExternas: boolean;

  @ApiProperty()
  idGerencia: number;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  telefone: string;
}
