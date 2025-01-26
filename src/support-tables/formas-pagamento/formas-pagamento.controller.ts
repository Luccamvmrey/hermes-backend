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
import { FormasPagamentoService } from './formas-pagamento.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateFormaPagamentoDto } from './dto/create-forma-pagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-forma-pagamento.dto';
import { FormaPagamentoEntity } from './entity/forma-pagamento.entity';

@Controller('formas-pagamento')
export class FormasPagamentoController {
  constructor(
    private readonly formasPagamentoService: FormasPagamentoService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: FormaPagamentoEntity })
  create(@Body() createFormasPagamentoDto: CreateFormaPagamentoDto) {
    return this.formasPagamentoService.create(createFormasPagamentoDto);
  }

  @Get()
  @ApiOkResponse({ type: FormaPagamentoEntity, isArray: true })
  findAll() {
    return this.formasPagamentoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FormaPagamentoEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.formasPagamentoService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FormaPagamentoEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormasPagamentoDto: UpdateFormaPagamentoDto,
  ) {
    return this.formasPagamentoService.update(id, updateFormasPagamentoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FormaPagamentoEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.formasPagamentoService.remove(id);
  }
}
