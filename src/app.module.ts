import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BancosModule } from './bancos/bancos.module';
import { ContasModule } from './contas/contas.module';
import { EmpresasModule } from './empresas/empresas.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { FormasPagamentoModule } from './formas-pagamento/formas-pagamento.module';
import { GerenciasModule } from './gerencias/gerencias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { EmpresaUsuarioModule } from './empresa-usuario/empresa-usuario.module';
import { ContasPagarModule } from './contas-pagar/contas-pagar.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { ContasContabeisModule } from './contas-contabeis/contas-contabeis.module';
import { SubContasModule } from './sub-contas/sub-contas.module';

@Module({
  imports: [
    DatabaseModule,
    BancosModule,
    ContasModule,
    EmpresasModule,
    PessoasModule,
    FormasPagamentoModule,
    GerenciasModule,
    UsuariosModule,
    AuthModule,
    EmpresaUsuarioModule,
    ContasPagarModule,
    PagamentosModule,
    ContasContabeisModule,
    SubContasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
