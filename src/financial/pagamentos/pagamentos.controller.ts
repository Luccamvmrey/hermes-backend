import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from "@nestjs/common";
import { PagamentosService } from "./pagamentos.service";
import { Prisma } from "@prisma/client";
import { PaginationDto } from "../../common/pagination/dto/pagination.dto";

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pagamentosService.findAll(paginationDto);
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.pagamentosService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pagamentosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePagamentoDto: Prisma.PagamentoUpdateInput
  ) {
    if (updatePagamentoDto.valorPago) {
      return this.pagamentosService.updateValorPago(id, updatePagamentoDto);
    }
    return this.pagamentosService.update(id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pagamentosService.remove(id);
  }
}
