import { Module } from '@nestjs/common';
import { ArquivosService } from './arquivos.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ArquivosService],
  exports: [ArquivosService],
})
export class ArquivosModule {}
