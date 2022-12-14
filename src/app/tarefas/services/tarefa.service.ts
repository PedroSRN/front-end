import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { computeStyles } from "@popperjs/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsTarefaViewModel } from "../view-models/forms-tarefa-viewmodel";
import { ListarTarefaViewModel } from "../view-models/listar-tarefa.vew-model";
import { VisualizarTarefaViewModel } from "../view-models/visualizar-tarefa.view-model";

@Injectable()
export class TarefaService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) { }

  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    const resposta = this.http
      .post<FormsTarefaViewModel>(this.apiUrl + 'tarefas', tarefa, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  public editar(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    const resposta = this.http
      .put<FormsTarefaViewModel>(this.apiUrl + 'tarefas/' + tarefa.id, tarefa, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  public excluir(id: string): Observable<string> {
    const resposta = this.http
      .delete<string>(this.apiUrl + 'tarefas/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;

  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    const resposta = this.http
    .get<ListarTarefaViewModel[]>(this.apiUrl + 'tarefas', this.obterHeadersAutorizacao( ))
    .pipe(map(this.processarDados), catchError(this.processarFalha))

    return resposta;
  }

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel> {
    const resposta = this.http
      .get<FormsTarefaViewModel>(this.apiUrl + 'tarefas/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarTarefaCompletaPorId(id: string): Observable<VisualizarTarefaViewModel> {
    const resposta = this.http
      .get<VisualizarTarefaViewModel>(this.apiUrl + 'tarefas/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  private obterHeadersAutorizacao(){
    const token = this.localStorageService.obterTokenUsuario();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      })
    }
  }

  private processarDados(resposta: any){
    if(resposta?.sucesso)
      return resposta.dados;
  }

  private processarFalha(resposta: any) {
    console.log(resposta);
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
