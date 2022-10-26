import { LocalizacaoCompromisso } from "./localizacao-compromisso.enum";

export class FormsCompromissosViewModel {
  id: string;
  assunto: string;
  local: string;
  tipoLocal: LocalizacaoCompromisso;
  link:	string;
  data:	string;
  horaInicio:	string;
  horaTermino:	string;
  contatoId:	string;
}
