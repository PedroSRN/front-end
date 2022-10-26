import { ListarContatoViewModel } from "src/app/contatos/view-Models/listar-contato.view-model";
import { LocalizacaoCompromisso } from "./localizacao-compromisso.enum";

export class VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  local:	string;
  tipoLocal: LocalizacaoCompromisso;
  link:	string;
  data:	string;
  horaInicio: string;
  horaTermino:	string;
  contato: ListarContatoViewModel;
}
