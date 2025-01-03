import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ContasPagarService } from './contas-pagar.service';
import { CreateContasPagarDto } from './dto/create-contas-pagar.dto';
import { UpdateContasPagarDto } from './dto/update-contas-pagar.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ContasPagarEntity } from './entities/contas-pagar.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MinioClientService } from '../../storage/minio/minio-client.service';
import { Response } from 'express';

@Controller('contas-pagar')
export class ContasPagarController {
  constructor(
    private readonly contasPagarService: ContasPagarService,
    private readonly minioClientService: MinioClientService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ContasPagarEntity })
  create(@Body() createContasPagarDto: CreateContasPagarDto) {
    return this.contasPagarService.create(createContasPagarDto);
  }

  @Post('/upload/:idContaPagar')
  @UseInterceptors(FilesInterceptor('files'))
  uploadContaPagarFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('idContaPagar', ParseIntPipe) idContaPagar: number,
  ) {
    return this.minioClientService.upload(
      files,
      'CONTA-PAGAR', 
      idContaPagar
    );
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

  @Get('/download/:objectName')
  async downloadFile(
    @Param('objectName') objectName: string,
    @Res() res: Response,
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
