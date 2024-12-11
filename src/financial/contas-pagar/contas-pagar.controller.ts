import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContasPagarService } from './contas-pagar.service';
import { CreateContasPagarDto } from './dto/create-contas-pagar.dto';
import { UpdateContasPagarDto } from './dto/update-contas-pagar.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ContasPagarEntity } from './entities/contas-pagar.entity';

@Controller('contas-pagar')
export class ContasPagarController {
  constructor(private readonly contasPagarService: ContasPagarService) {}

  @Post()
  @ApiCreatedResponse({ type: ContasPagarEntity })
  create(@Body() createContasPagarDto: CreateContasPagarDto) {
    return this.contasPagarService.create(createContasPagarDto);
  }

  @Get()
  @ApiOkResponse({ type: ContasPagarEntity, isArray: true })
  findAll() {
    return this.contasPagarService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ContasPagarEntity })
  findOne(@Param('id') id: string) {
    return this.contasPagarService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ContasPagarEntity })
  update(
    @Param('id') id: string,
    @Body() updateContasPagarDto: UpdateContasPagarDto,
  ) {
    return this.contasPagarService.update(+id, updateContasPagarDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ContasPagarEntity })
  remove(@Param('id') id: string) {
    return this.contasPagarService.remove(+id);
  }
}
