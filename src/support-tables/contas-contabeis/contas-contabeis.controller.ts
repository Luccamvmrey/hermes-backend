import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseIntPipe
} from "@nestjs/common";
import { ContasContabeisService } from './contas-contabeis.service';
import { CreateContaContabilDto } from './dto/create-conta-contabil.dto';
import { UpdateContaContabilDto } from './dto/update-conta-contabil.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ContaContabilEntity } from './entities/conta-contabil.entity';

@Controller('contas-contabeis')
export class ContasContabeisController {
  constructor(
    private readonly contasContabeisService: ContasContabeisService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ContaContabilEntity })
  create(@Body() createContaContabilDto: CreateContaContabilDto) {
    return this.contasContabeisService.create(createContaContabilDto);
  }

  @Get()
  @ApiOkResponse({ type: ContaContabilEntity, isArray: true })
  findAll() {
    return this.contasContabeisService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ContaContabilEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contasContabeisService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ContaContabilEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContaContabilDto: UpdateContaContabilDto,
  ) {
    return this.contasContabeisService.update(id, updateContaContabilDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ContaContabilEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contasContabeisService.remove(id);
  }
}
