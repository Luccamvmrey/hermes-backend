import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BancosModule } from './support-tables/bancos/bancos.module';
import { ContasModule } from './support-tables/contas/contas.module';
import { EmpresasModule } from './support-tables/empresas/empresas.module';
import { PessoasModule } from './support-tables/pessoas/pessoas.module';
import { FormasPagamentoModule } from './support-tables/formas-pagamento/formas-pagamento.module';
import { GerenciasModule } from './support-tables/gerencias/gerencias.module';
import { UsuariosModule } from './user/usuarios/usuarios.module';
import { AuthModule } from './user/auth/auth.module';
import { EmpresaUsuarioModule } from './support-tables/empresa-usuario/empresa-usuario.module';
import { ContasPagarModule } from './financial/contas-pagar/contas-pagar.module';
import { PagamentosModule } from './financial/pagamentos/pagamentos.module';
import { ContasContabeisModule } from './support-tables/contas-contabeis/contas-contabeis.module';
import { SubContasModule } from './support-tables/sub-contas/sub-contas.module';

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
