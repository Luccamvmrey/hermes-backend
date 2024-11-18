import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [PagamentosService],
  exports: [PagamentosService]
})
export class PagamentosModule {}
