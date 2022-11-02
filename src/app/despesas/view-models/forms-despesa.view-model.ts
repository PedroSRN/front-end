import { FormaPagamentoEnum } from "./forma-pagamento.enum";

export class FormsDespesaViewModel {
  id:	string;
  descricao:	string;
  valor: number;
  data: Date;
  formaPagamento: FormaPagamentoEnum
  categorias: CategoriaSelecionadaViewModel[] = [];
}

export class CategoriaSelecionadaViewModel {
  id: string;
  titulo: string;
  selecionada: boolean;
}
