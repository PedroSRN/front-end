import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { VisualizarContatoViewModel } from "../view-Models/visualizar-contato.view-model";
import { ContatoService } from "./contato.service";


@Injectable()
export class VisualizarContatoResolver implements Resolve<VisualizarContatoViewModel> {

  constructor(private contatoService: ContatoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarContatoViewModel> {
    return this.contatoService.selecionarContatoCompletoPorId(route.params['id']);

  }
}
