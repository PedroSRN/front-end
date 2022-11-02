import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { FormsCategoriasViewModel } from '../view-models/form-categoria.view-model';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styles: [
  ]
})
export class InserirCategoriaComponent implements OnInit {
  public formCategoria: FormGroup;

  public categoriaFormVM: FormsCategoriasViewModel = new FormsCategoriasViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
    ) {
      titulo.setTitle('Cadastrar Categoria - e-Agenda');
    }

  ngOnInit(): void {

    this.formCategoria = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
    });
    
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }


  public gravar() {
    if (this.formCategoria.invalid) return;

    this.categoriaFormVM = Object.assign({}, this.categoriaFormVM, this.formCategoria.value);

    this.categoriaService.inserir(this.categoriaFormVM)
      .subscribe({
        next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(categoria: FormsCategoriasViewModel): void {
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: any) {
    if(erro) {
      console.error(erro);
    }
  }
}
