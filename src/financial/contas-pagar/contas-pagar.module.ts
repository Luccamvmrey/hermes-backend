import { Module } from '@nestjs/common';
import { ContasPagarService } from './contas-pagar.service';
import { ContasPagarController } from './contas-pagar.controller';
import { DatabaseModule } from "../../database/database.module";
import { PagamentosModule } from "../pagamentos/pagamentos.module";
import { FormasPagamentoModule } from "../../support-tables/formas-pagamento/formas-pagamento.module";
import { MinioClientModule } from 'src/storage/minio/minio-client.module';

@Module({
  imports: [DatabaseModule, PagamentosModule, FormasPagamentoModule, MinioClientModule],
  controllers: [ContasPagarController],
  providers: [ContasPagarService],
  exports: [ContasPagarService],
})
export class ContasPagarModule {}
