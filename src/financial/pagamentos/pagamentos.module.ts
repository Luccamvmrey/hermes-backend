import { forwardRef, Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { DatabaseModule } from '../../database/database.module';
import { PagamentosController } from './pagamentos.controller';
import { ContasPagarModule } from '../contas-pagar/contas-pagar.module';
import { UsuariosModule } from '../../user/usuarios/usuarios.module';
import { MinioClientModule } from 'src/storage/minio/minio-client.module';

@Module({
  imports: [
    DatabaseModule,
    UsuariosModule,
    MinioClientModule,
    forwardRef(() => ContasPagarModule),
  ],
  providers: [PagamentosService],
  exports: [PagamentosService],
  controllers: [PagamentosController],
})
export class PagamentosModule {}
