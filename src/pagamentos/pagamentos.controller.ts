import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { PagamentosService } from "./pagamentos.service";
import { Prisma } from "@prisma/client";

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Get()
  findAll() {
    return this.pagamentosService.findAll();
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
