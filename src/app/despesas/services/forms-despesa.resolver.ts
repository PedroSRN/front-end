import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FormsDespesaViewModel } from "../view-models/forms-despesa.view-model";
import { DespesaService } from "./despesa.service";

@Injectable()
export class FormsDespesaResolver implements Resolve<FormsDespesaViewModel> {

  constructor(private despesaService: DespesaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsDespesaViewModel> {
    return this.despesaService.selecionarPorId(route.params['id']);
  }
}
