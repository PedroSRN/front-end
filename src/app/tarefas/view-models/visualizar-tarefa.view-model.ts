export class VisualizarTarefaViewModel {
  id: string;
  titulo: string;
  prioridade: string;

  dataCriacao: Date;
  percentualConcluido: number;

  itens: VisualizarItemtarefaViewModel[] = [];
}

export class VisualizarItemtarefaViewModel {
  titulo: string;
  concluido: boolean;
}
