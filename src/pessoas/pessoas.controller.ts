import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post
} from "@nestjs/common";
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PessoaEntity } from './entity/pessoa.entity';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  @ApiCreatedResponse({ type: PessoaEntity })
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  @ApiOkResponse({ type: PessoaEntity, isArray: true })
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PessoaEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PessoaEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PessoaEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.remove(id);
  }
}
