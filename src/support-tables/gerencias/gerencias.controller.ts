import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GerenciasService } from './gerencias.service';
import { CreateGerenciaDto } from './dto/create-gerencia.dto';
import { UpdateGerenciaDto } from './dto/update-gerencia.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GerenciaEntity } from './entity/gerencia.entity';

@Controller('gerencias')
export class GerenciasController {
  constructor(private readonly gerenciasService: GerenciasService) {}

  @Post()
  @ApiCreatedResponse({ type: GerenciaEntity })
  create(@Body() createGerenciaDto: CreateGerenciaDto) {
    return this.gerenciasService.create(createGerenciaDto);
  }

  @Get()
  @ApiOkResponse({ type: GerenciaEntity, isArray: true })
  findAll(@Query('nome') nome?: string) {
    return this.gerenciasService.findAll(nome);
  }

  @Get(':id')
  @ApiOkResponse({ type: GerenciaEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gerenciasService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GerenciaEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGerenciaDto: UpdateGerenciaDto,
  ) {
    return this.gerenciasService.update(id, updateGerenciaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: GerenciaEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gerenciasService.remove(id);
  }
}
