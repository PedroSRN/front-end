import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FormsCompromissosViewModel } from "../View-Models/form-compromisso-view.model";
import { CompromissoService } from "./compromisso.service";

@Injectable()
export class FormsCompromissoResolver implements Resolve<FormsCompromissosViewModel> {

  constructor(private compromissoService: CompromissoService) { }

  resolve(route: ActivatedRouteSnapshot):  Observable<FormsCompromissosViewModel> {
    return this.compromissoService.selecionarPorId(route.params['id']);

  }
}
