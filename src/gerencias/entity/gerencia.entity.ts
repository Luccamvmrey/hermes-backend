import { Gerencia } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class GerenciaEntity implements Gerencia {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  ativo: boolean;
}