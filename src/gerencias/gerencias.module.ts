import { Module } from '@nestjs/common';
import { GerenciasService } from './gerencias.service';
import { GerenciasController } from './gerencias.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GerenciasController],
  providers: [GerenciasService],
})
export class GerenciasModule {}
