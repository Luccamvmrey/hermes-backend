import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { EmpresaUsuarioModule } from '../../support-tables/empresa-usuario/empresa-usuario.module';
import { UsuariosService } from '../usuarios/usuarios.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, UsuariosModule, EmpresaUsuarioModule],
  controllers: [AuthController],
  providers: [UsuariosService],
})
export class AuthModule {}
