import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CentroCustoService } from './centro-custo.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CentroCustoEntity } from './entities/centro-custo.entity';
import { Prisma } from '@prisma/client';

@Controller('centro-custo')
export class CentroCustoController {
  constructor(private readonly centroCustoService: CentroCustoService) {}

  @Post()
  @ApiCreatedResponse({ type: CentroCustoEntity })
  create(@Body() createCentroCustoDto: Prisma.CentroCustoCreateInput) {
    return this.centroCustoService.create(createCentroCustoDto);
  }

  @Get()
  @ApiOkResponse({ type: CentroCustoEntity, isArray: true })
  findAll() {
    return this.centroCustoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CentroCustoEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.centroCustoService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CentroCustoEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCentroCustoDto: Prisma.CentroCustoUpdateInput,
  ) {
    return this.centroCustoService.update(id, updateCentroCustoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CentroCustoEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.centroCustoService.remove(id);
  }
}