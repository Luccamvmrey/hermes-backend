import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseIntPipe
} from "@nestjs/common";
import { SubContasService } from './sub-contas.service';
import { CreateSubContaDto } from './dto/create-sub-conta.dto';
import { UpdateSubContaDto } from './dto/update-sub-conta.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SubContaEntity } from './entities/sub-conta.entity';

@Controller('sub-contas')
export class SubContasController {
  constructor(private readonly subContasService: SubContasService) {}

  @Post()
  @ApiCreatedResponse({ type: SubContaEntity })
  create(@Body() createSubContaDto: CreateSubContaDto) {
    return this.subContasService.create(createSubContaDto);
  }

  @Get()
  @ApiOkResponse({ type: SubContaEntity, isArray: true })
  findAll() {
    return this.subContasService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SubContaEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subContasService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SubContaEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubContaDto: UpdateSubContaDto,
  ) {
    return this.subContasService.update(id, updateSubContaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SubContaEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subContasService.remove(id);
  }
}
