import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MinioService } from 'nestjs-minio-client';
import { minioConfig } from './minio.config';
import { ArquivosService } from '../arquivos/arquivos.service';

@Injectable()
export class MinioClientService {
  private readonly baseBucket = minioConfig.MINIO_BUCKET;

  constructor(
    private readonly minio: MinioService,
    private readonly arquivosService: ArquivosService,
  ) {}

  async upload(files: Array<Express.Multer.File>, idContaPagar: number) {
    return await Promise.all(
      files.map(async (file) => {
        const timestamp = Date.now().toString();
        const hashedFileName = crypto
          .createHash('md5')
          .update(timestamp)
          .digest('hex');
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length,
        );
        const fileName = hashedFileName + extension;

        try {
          await this.minio.client.putObject(
            this.baseBucket,
            fileName,
            file.buffer,
          );
        } catch (error) {
          console.log(error);
          throw new HttpException(
            'Error uploading file',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        return await this.arquivosService.create(fileName, file.originalname, idContaPagar);
      }),
    );
  }

  async downloadFile(objectName: string) {
    return await this.minio.client.getObject(this.baseBucket, objectName);
  }
}
