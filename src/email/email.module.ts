// email.module.ts
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { DynamicEmailService } from './dynamic-email.service';
import { DatabaseModule } from '../database/database.module';
import { EmpresasModule } from '../support-tables/empresas/empresas.module';

@Module({
  controllers: [EmailController],
  providers: [DynamicEmailService],
  imports: [DatabaseModule, EmpresasModule],
})
export class EmailModule {}
