import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BancosService } from './bancos.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BancoEntity } from './entity/banco.entity';

@Controller('bancos')
export class BancosController {
  constructor(private readonly bancosService: BancosService) {}

  @Post()
  @ApiCreatedResponse({ type: BancoEntity })
  create(@Body() createBancoDto: CreateBancoDto) {
    return this.bancosService.create(createBancoDto);
  }

  @Get()
  @ApiOkResponse({ type: BancoEntity, isArray: true })
  findAll() {
    return this.bancosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BancoEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bancosService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BancoEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBancoDto: UpdateBancoDto,
  ) {
    return this.bancosService.update(id, updateBancoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BancoEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bancosService.remove(id);
  }
}
