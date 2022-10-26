import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { FormsCompromissosViewModel } from '../View-Models/form-compromisso-view.model';
import { ListarCompromissoViewModel } from '../View-Models/listar-compromisso.view-model';
import { VisualizarCompromissoViewModel } from '../View-Models/visualizar-compromisso.view-model';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public inserir(compromisso: FormsCompromissosViewModel): Observable<FormsCompromissosViewModel> {
    const resposta = this.http
      .post<FormsCompromissosViewModel>(this.apiUrl + 'compromissos', compromisso, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  public editar(compromisso: FormsCompromissosViewModel): Observable<FormsCompromissosViewModel> {
    const resposta = this.http
      .put<FormsCompromissosViewModel>(this.apiUrl + 'compromissos/' + compromisso.id, compromisso, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  public excluir(id: string): Observable<string> {
    const resposta = this.http
      .delete<string>(this.apiUrl + 'compromissos/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    const resposta = this.http
    .get<ListarCompromissoViewModel[]>(this.apiUrl + 'compromissos', this.obterHeadersAutorizacao( ))
    .pipe(map(this.processarDados), catchError(this.processarFalha))

    return resposta;
  }

  public selecionarPorId(id: string): Observable<FormsCompromissosViewModel> {
    const resposta = this.http
      .get<FormsCompromissosViewModel>(this.apiUrl + 'compromissos/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarCompromissoCompletoPorId(id: string): Observable<VisualizarCompromissoViewModel> {
    const resposta = this.http
      .get<VisualizarCompromissoViewModel>(this.apiUrl + 'compromissos/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
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
