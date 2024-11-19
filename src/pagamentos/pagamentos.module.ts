import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { DatabaseModule } from "../database/database.module";
import { PagamentosController } from './pagamentos.controller';

@Module({
  imports: [DatabaseModule],
  providers: [PagamentosService],
  exports: [PagamentosService],
  controllers: [PagamentosController]
})
export class PagamentosModule {}
