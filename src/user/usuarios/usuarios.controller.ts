import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Query
} from "@nestjs/common";
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { UsuarioEntity } from './entity/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiQuery({name: 'nome', required: false})
  @ApiQuery({name: 'sessionToken', required: false})
  @ApiOkResponse({ type: UsuarioEntity, isArray: true })
  findAll(
    @Query('nome') nome?: string,
    @Query('sessionToken') sessionToken?: string,
  ) {
    return this.usuariosService.findAll(nome, sessionToken);
  }

  @Get(':id')
  @ApiOkResponse({ type: UsuarioEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UsuarioEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UsuarioEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }
}
