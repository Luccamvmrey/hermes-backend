import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as crypto from 'crypto';
import {MinioService} from "nestjs-minio-client";
import {BufferedFile} from "./file.model";
import {minioConfig} from "./minio.config";

@Injectable()
export class MinioClientService {
    private readonly baseBucket = minioConfig.MINIO_BUCKET;

    public get client() {
        return this.minio.client;

    }


    constructor(
        private readonly minio: MinioService,
    ) {
    }

    async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
        if (!(file.mimetype.includes('pdf'))) {
            throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
        }
        const temp_file = Date.now().toString();
        const hashedFileName = crypto.createHash('md5').update(temp_file).digest('hex');
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };

        const filename = hashedFileName + ext
        const fileName: string = `${filename}`;
        const fileBuffer = file.buffer;
        this.client.putObject(baseBucket, fileName, fileBuffer, fileBuffer.length, metaData, function (err, res) {
            if (err) console.log(err)
        })

        return filename

    }

    async getObject(objectName: string, baseBucket: string = this.baseBucket ) {
        return this.client.getObject(baseBucket, objectName)
    }

    async delete(objetName: string, baseBucket: string = this.baseBucket) {
        this.client.removeObject(baseBucket, objetName, function (err) {
            if (err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
        })
    }
}
