import { Module } from '@nestjs/common';
import { SubContasService } from './sub-contas.service';
import { SubContasController } from './sub-contas.controller';
import { DatabaseModule } from "../../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [SubContasController],
  providers: [SubContasService],
})
export class SubContasModule {}
