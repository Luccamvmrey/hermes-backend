import { Module } from '@nestjs/common';
import { CentroCustoService } from './centro-custo.service';
import { CentroCustoController } from './centro-custo.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CentroCustoController],
  providers: [CentroCustoService],
})
export class CentroCustoModule {}
