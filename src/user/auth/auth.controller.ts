import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LogUsuarioInDto } from '../usuarios/dto/log-usuario-in.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UsuarioEntity } from '../usuarios/entity/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('login')
  @ApiOkResponse({ type: UsuarioEntity })
  login(@Body() logUsuarioInDto: LogUsuarioInDto) {
    return this.usuariosService.login(logUsuarioInDto);
  }

  @Post('create')
  @ApiOkResponse({ type: UsuarioEntity })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {

    return this.usuariosService.create(createUsuarioDto);
  }
}
