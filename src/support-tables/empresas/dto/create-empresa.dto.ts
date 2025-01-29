import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fantasia: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  razao: string;

  @ApiProperty({ required: false })
  tipo?: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @ApiProperty({ required: false })
  ie?: string | null;

  @ApiProperty({ required: false })
  im?: string | null;

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  site?: string | null;

  @IsNotEmpty()
  @ApiProperty()
  fundacao: Date | string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  ativo?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  apelido?: string | null;

  @IsNotEmpty()
  @ApiProperty()
  Usuario: Prisma.UsuarioCreateNestedOneWithoutEmpresaInput;

  @ApiProperty({ required: false })
  SMTP : Prisma.SMTPCreateNestedOneWithoutEmpresaInput;

  @ApiProperty({ required: false })
  Conta?: Prisma.ContaCreateNestedManyWithoutEmpresaInput;

  @ApiProperty({ required: false })
  ContaPagar?: Prisma.ContaPagarCreateNestedManyWithoutEmpresaInput;

  @ApiProperty({ required: false })
  EmpresaUsuario?: Prisma.EmpresaUsuarioCreateNestedManyWithoutEmpresaInput;

  @ApiProperty({ required: false })
  Pessoa?: Prisma.PessoaCreateNestedManyWithoutEmpresaInput;
}
