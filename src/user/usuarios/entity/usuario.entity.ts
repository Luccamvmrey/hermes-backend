import { $Enums, Usuario } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioEntity implements Usuario {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  senha: string;

  @ApiProperty({ required: false })
  sessionToken: string;

  @ApiProperty()
  userRole: $Enums.UserRole;

  @ApiProperty()
  idGerencia: number;

  @ApiProperty()
  ativo: boolean;
}
