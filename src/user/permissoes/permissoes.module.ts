import { Module } from '@nestjs/common';
import { PermissoesController } from './permissoes.controller';
import { PermissoesService } from './permissoes.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [PermissoesController],
  providers: [PermissoesService],
  imports: [DatabaseModule],
})
export class PermissoesModule {}
