import { forwardRef, Inject, Module } from "@nestjs/common";
import { PagamentosService } from './pagamentos.service';
import { DatabaseModule } from "../database/database.module";
import { PagamentosController } from './pagamentos.controller';
import { ContasPagarModule } from "../contas-pagar/contas-pagar.module";

@Module({
  imports: [DatabaseModule, forwardRef(() => ContasPagarModule)],
  providers: [PagamentosService],
  exports: [PagamentosService],
  controllers: [PagamentosController]
})
export class PagamentosModule {}
