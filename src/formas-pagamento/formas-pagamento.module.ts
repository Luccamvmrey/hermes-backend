import { Module } from '@nestjs/common';
import { FormasPagamentoService } from './formas-pagamento.service';
import { FormasPagamentoController } from './formas-pagamento.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FormasPagamentoController],
  providers: [FormasPagamentoService],
  exports: [FormasPagamentoService],
})
export class FormasPagamentoModule {}
