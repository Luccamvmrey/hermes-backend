import { Module } from '@nestjs/common';
import { ContasContabeisService } from './contas-contabeis.service';
import { ContasContabeisController } from './contas-contabeis.controller';
import { DatabaseModule } from "../../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ContasContabeisController],
  providers: [ContasContabeisService],
})
export class ContasContabeisModule {}
