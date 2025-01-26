import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { minioConfig } from './minio.config';
import { ArquivosModule } from '../arquivos/arquivos.module';

@Module({
  imports: [
    MinioModule.register({
      endPoint: minioConfig.MINIO_ENDPOINT,
      port: minioConfig.MINIO_PORT,
      useSSL: true,
      accessKey: minioConfig.MINIO_ACCESSKEY,
      secretKey: minioConfig.MINIO_SECRETKEY,
      region: 'us-east-1',
    }),
    ArquivosModule,
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
