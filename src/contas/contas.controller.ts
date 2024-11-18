import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseIntPipe
} from "@nestjs/common";
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ContaEntity } from './entity/conta.entity';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  @ApiCreatedResponse({ type: ContaEntity })
  create(@Body() createContaDto: CreateContaDto) {
    return this.contasService.create(createContaDto);
  }

  @Get()
  @ApiOkResponse({ type: ContaEntity, isArray: true })
  findAll() {
    return this.contasService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ContaEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contasService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ContaEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContaDto: UpdateContaDto) {
    return this.contasService.update(id, updateContaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ContaEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contasService.remove(id);
  }
}
