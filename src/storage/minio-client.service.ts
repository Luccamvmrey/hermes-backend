import { Injectable, Logger } from "@nestjs/common";
import { minioConfig } from "./minio.config";
import { MinioService } from "nestjs-minio-client";
import { BufferedFile } from "./file.model";

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = minioConfig.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {

  }
}
