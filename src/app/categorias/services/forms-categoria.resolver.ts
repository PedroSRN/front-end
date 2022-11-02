import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { FormsCategoriasViewModel } from "../view-models/form-categoria.view-model";
import { CategoriaService } from "./categoria.service";

@Injectable()
export class FormsCategoriaResolver implements Resolve<FormsCategoriasViewModel> {

  constructor(private categoriaService: CategoriaService) { }

  resolve(route: ActivatedRouteSnapshot):  Observable<FormsCategoriasViewModel> {
    return this.categoriaService.selecionarPorId(route.params['id']);

  }
}
