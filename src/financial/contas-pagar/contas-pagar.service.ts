import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateContasPagarDto } from './dto/update-contas-pagar.dto';
import { DatabaseService } from '../../database/database.service';
import { PagamentosService } from '../pagamentos/pagamentos.service';
import { FormasPagamentoService } from '../../support-tables/formas-pagamento/formas-pagamento.service';
import { ContaPagar, Pagamento, Prisma } from '@prisma/client';
import { DynamicEmailService } from '../../email/dynamic-email.service';

@Injectable()
export class ContasPagarService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => PagamentosService))
    private readonly pagamentosService: PagamentosService,
    private readonly formasPagamentoService: FormasPagamentoService,
    private readonly emailService: DynamicEmailService,
  ) {}

  async create(data: Prisma.ContaPagarCreateInput) {
    const contaPagar = await this.databaseService.contaPagar.create({ data });

    await this.criarParcelasPagamento(contaPagar);

    if (!(await this.emailService.hasSMTPConfig(contaPagar.idEmpresa))) {
      return contaPagar;
    }

    await this.enviarNotificacao(contaPagar.id);

    return contaPagar;
  }

  private async criarParcelasPagamento(contaPagar: ContaPagar) {
    const formaPagamento = await this.formasPagamentoService.findOne(
      contaPagar.idFormaPagamento,
    );
    const { parcelas, intervalo } = formaPagamento;

    const dataVencimento = new Date(contaPagar.dataVencimento);
    const valorParcela = +contaPagar.valor / parcelas;

    await Promise.all(
      Array.from({ length: parcelas }, (_, i) =>
        this.pagamentosService.create({
          dataVencimento: new Date(
            dataVencimento.setDate(dataVencimento.getDate() + i * intervalo),
          ),
          valorParcela,
          lote: i + 1,
          ContaPagar: { connect: { id: contaPagar.id } },
        }),
      ),
    );
  }

  private async enviarNotificacao(contaPagarId: number) {
    const contaPagarWithDetails = await this.findOne(contaPagarId);
    const body = this.gerarCorpoEmail(contaPagarWithDetails);

    await this.emailService.sendEmail({
      idEmpresa: contaPagarWithDetails.idEmpresa,
      subject: 'Nova conta a pagar cadastrada',
      to: contaPagarWithDetails.Usuario.Superior.email,
      text: body,
    });
  }

  private gerarCorpoEmail(contaPagarWithDetails: any): string {
    const pagamentosDetalhes = this.gerarDetalhesPagamentos(
      contaPagarWithDetails.Pagamento,
    );

    return `
      Nova Conta a Pagar Cadastrada
  
      Responsável: ${contaPagarWithDetails.Usuario.Superior.nome}
      Cadastrada por: ${contaPagarWithDetails.Usuario.nome}
  
      Detalhes:
      - Empresa: ${contaPagarWithDetails.Empresa.apelido}
      - Fornecedor: ${contaPagarWithDetails.Pessoa.razao}
      - Data de Emissão: ${this.formatDate(contaPagarWithDetails.dataEmissao)}
      - Conta Contábil: ${contaPagarWithDetails.ContaContabil.nome}
      - Sub Conta: ${contaPagarWithDetails.SubConta.nome}
      - Centro de Custo: ${contaPagarWithDetails.CentroCusto.nome}
      - Descrição: ${contaPagarWithDetails.descricao}
  
      A compra foi parcelada em ${contaPagarWithDetails.Pagamento.length} vezes:
      ${pagamentosDetalhes}
  
      Acesse o sistema para mais detalhes.
    `
      .split('\n')
      .map((line) => line.trimStart())
      .join('\n')
      .trim();
  }

  private gerarDetalhesPagamentos(pagamentos: Pagamento[]): string {
    return pagamentos
      .map(
        (pagamento, index) =>
          `${index + 1}ª Parcela: R$ ${pagamento.valorParcela.toFixed(2)}
        Vencimento: ${this.formatDate(pagamento.dataVencimento)}
        ID do Pagamento: ${pagamento.id}`,
      )
      .map((line) => line.trimStart())
      .join('\n\n')
      .trim();
  }

  formatDate = (data: string | Date) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  async findAll() {
    return this.databaseService.contaPagar.findMany({
      include: {
        Usuario: true,
        Empresa: true,
        Pessoa: true,
        FormaPagamento: true,
        Arquivo: true,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.contaPagar.findUnique({
      where: {
        id,
      },
      include: {
        Empresa: true,
        Pessoa: true,
        FormaPagamento: true,
        SubConta: true,
        ContaContabil: true,
        CentroCusto: true,
        Pagamento: true,
        Arquivo: true,
        Usuario: {
          include: {
            Superior: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateContasPagarDto) {
    return this.databaseService.contaPagar.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateValorTotal(id: number) {
    const contaPagar = await this.findOne(id);
    const newTotalValue = contaPagar.Pagamento.reduce(
      (acc, pagamento) => acc + Number(pagamento.valorParcela),
      0,
    );

    return this.update(id, { valor: newTotalValue });
  }

  async updateValorPago(id: number) {
    const contaPagar = await this.findOne(id);
    const newTotalValue = contaPagar.Pagamento.reduce(
      (acc, pagamento) => acc + Number(pagamento.valorPago),
      0,
    );

    return this.update(id, { valorPago: newTotalValue });
  }

  async updateLoteParcelas(id: number) {
    const contaPagar = await this.findOne(id);
    const { Pagamento } = contaPagar;

    for (let i = 0; i < Pagamento.length; i++) {
      const pagamento = Pagamento[i];
      await this.pagamentosService.update(pagamento.id, { lote: i + 1 });
    }
  }

  async remove(id: number) {
    return this.databaseService.contaPagar.delete({
      where: {
        id,
      },
    });
  }
}
