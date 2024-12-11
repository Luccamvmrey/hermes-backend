import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DatabaseModule } from '../../database/database.module';
import { EmpresaUsuarioModule } from '../../support-tables/empresa-usuario/empresa-usuario.module';
import { EmpresaUsuarioService } from '../../support-tables/empresa-usuario/empresa-usuario.service';

@Module({
  imports: [DatabaseModule, EmpresaUsuarioModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, EmpresaUsuarioService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
