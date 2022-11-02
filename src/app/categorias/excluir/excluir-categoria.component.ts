import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { VisualizarCategoriaViewModel } from '../view-models/visualizar-categorias.view-model';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styles: [
  ]
})
export class ExcluirCategoriaComponent implements OnInit {
  public categoriaFormVM: VisualizarCategoriaViewModel = new VisualizarCategoriaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    titulo.setTitle('Excluir Categoria - e-Agenda');
  }

  ngOnInit(): void {
    this.categoriaFormVM = this.route.snapshot.data['categoria']
  }

  public gravar(){

    this.categoriaService.excluir(this.categoriaFormVM.id)
      .subscribe({
        next: (categoriaId) => this.processarSucesso(categoriaId),
        error: (erro) => this.processarFalha(erro)
    })
  }

  private processarSucesso(categoriaId: string): void {
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }
}
