import { Module } from '@nestjs/common';
import { EmpresaUsuarioService } from './empresa-usuario.service';
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [EmpresaUsuarioService],
  exports: [EmpresaUsuarioService]
})
export class EmpresaUsuarioModule {}
