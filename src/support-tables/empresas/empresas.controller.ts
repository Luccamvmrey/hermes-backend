import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, ParseIntPipe
} from "@nestjs/common";
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { EmpresaEntity } from './entity/empresa.entity';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  @ApiCreatedResponse({ type: EmpresaEntity })
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  @ApiQuery({name: 'cnpj', required: false})
  @ApiQuery({name: 'fantasia', required: false})
  @ApiQuery({name: 'razao', required: false})
  @ApiOkResponse({ type: EmpresaEntity, isArray: true })
  findAll(
    @Query('cnpj') cnpj?: string,
    @Query('fantasia') fantasia?: string,
    @Query("razao") razao?: string,
  ) {
    return this.empresasService.findAll(cnpj, fantasia, razao);
  }

  @Get(':id')
  @ApiOkResponse({ type: EmpresaEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.empresasService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EmpresaEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EmpresaEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.empresasService.remove(id);
  }
}
