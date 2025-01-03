import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Res, UseInterceptors } from "@nestjs/common";
import { PagamentosService } from "./pagamentos.service";
import { Prisma } from "@prisma/client";
import { PaginationDto } from "../../common/pagination/dto/pagination.dto";
import { PayValueDto } from "./dto/pay-value.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MinioClientService } from "src/storage/minio/minio-client.service";
import { Response } from "express";

@Controller('pagamentos')
export class PagamentosController {
  constructor(
    private readonly pagamentosService: PagamentosService,
    private readonly minioClientService: MinioClientService
  ) {}

  @Post('/upload/:idPagamento')
  @UseInterceptors(FilesInterceptor('files'))
  uploadPagamentoFiles(
    @Param('idPagamento', ParseIntPipe) idPagamento: number,
    @Body() files: Array<Express.Multer.File>
  ) {
    return this.minioClientService.upload(
      files,
      'PAGAMENTO',
      idPagamento
    );
  }

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

  @Get('/download/:objectName')
  async downloadFile(
    @Param('objectName') objectName: string,
    @Res() res: Response
  ) {
    const readerStream = await this.minioClientService.downloadFile(objectName);
    readerStream.on('data', (chunk) => {
      res.write(chunk, 'binary');
    });
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${objectName}`,
    });
    readerStream.on('end', () => {
      res.end();
    });
    readerStream.on('error', (err) => {
      console.log(err);
      throw new HttpException(
        'Error downloading file',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    });
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

  @Patch('/pagar/:id')
  realizarPagamento(
    @Param('id', ParseIntPipe) id: number,
    @Body() PayValueDto: PayValueDto
  ) {
    return this.pagamentosService.updateValorPago(id, PayValueDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pagamentosService.remove(id);
  }
}
