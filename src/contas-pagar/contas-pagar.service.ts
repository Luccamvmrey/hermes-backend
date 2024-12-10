import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateContasPagarDto } from './dto/create-contas-pagar.dto';
import { UpdateContasPagarDto } from './dto/update-contas-pagar.dto';
import { DatabaseService } from '../database/database.service';
import { PagamentosService } from '../pagamentos/pagamentos.service';
import { FormasPagamentoService } from '../formas-pagamento/formas-pagamento.service';

@Injectable()
export class ContasPagarService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => PagamentosService))
    private readonly pagamentosService: PagamentosService,
    private readonly formasPagamentoService: FormasPagamentoService,
  ) {}

  async create(data: CreateContasPagarDto) {
    const contaPagar = await this.databaseService.contaPagar.create({
      data,
    });

    const formaPagamento = await this.formasPagamentoService.findOne(
      contaPagar.idFormaPagamento,
    );
    const { parcelas, intervalo } = formaPagamento;

    const dataVencimento = new Date(contaPagar.dataVencimento);
    const valorParcela = +contaPagar.valor / parcelas;

    for (let i = 0; i < parcelas; i++) {
      const dataVencPagamento = new Date(dataVencimento);
      dataVencPagamento.setDate(dataVencimento.getDate() + i * intervalo);
      await this.pagamentosService.create({
        dataVencimento: dataVencPagamento,
        valorParcela,
        lote: i + 1,
        ContaPagar: { connect: { id: contaPagar.id } },
      });
    }

    return contaPagar;
  }

  async findAll() {
    return this.databaseService.contaPagar.findMany({
      include: {
        Usuario: true,
        Empresa: true,
        Pessoa: true,
        FormaPagamento: true,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.contaPagar.findUnique({
      where: {
        id,
      },
      include: {
        Pessoa: true,
        FormaPagamento: true,
        Pagamento: true,
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
