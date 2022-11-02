import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/categorias/services/categoria.service';
import { ListarCategoriaViewModel } from 'src/app/categorias/view-models/listar-categorias.view-model';
import { DespesaService } from '../services/despesa.service';
import { FormaPagamentoEnum } from '../view-models/forma-pagamento.enum';
import { CategoriaSelecionadaViewModel, FormsDespesaViewModel } from '../view-models/forms-despesa.view-model';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styles: [
  ]
})
export class EditarDespesaComponent implements OnInit {
  public formDespesa: FormGroup;
  public formCategoria: FormGroup;
  public formasPagamento = Object.values(FormaPagamentoEnum)
    .filter(v => !Number.isFinite(v));

  public despesaFormVM: FormsDespesaViewModel = new FormsDespesaViewModel();

  public categorias$: Observable<ListarCategoriaViewModel[]>;

  public categoriasSelecionadas: CategoriaSelecionadaViewModel[];

  public categoriaAtual : ListarCategoriaViewModel;


  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private despesaService: DespesaService
  ) {
    titulo.setTitle('Editar Despesa - e-Agenda');
  }

  ngOnInit(): void {

    this.despesaFormVM = this.route.snapshot.data['despesa'];

    this.despesaFormVM.categorias.forEach(c => c.selecionada = true);

    this.categoriasSelecionadas = this.despesaFormVM.categorias.slice();

    this.categorias$ = this.categoriaService.selecionarTodos();

    this.formDespesa = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      formaPagamento: ['', [Validators.required]],
    });

    this.formCategoria = this.formBuilder.group({
      titulo: [''],
    });

    this.formDespesa.patchValue({

      id: this.despesaFormVM.id,
      descricao: this.despesaFormVM.descricao,
      valor: this.despesaFormVM.valor,
      data: this.despesaFormVM.data,
      formaPagamento: this.despesaFormVM.formaPagamento
    });


  }

  get descricao() {
    return this.formDespesa.get('descricao');
  }
  get valor() {
    return this.formDespesa.get('valor');
  }
  get data() {
    return this.formDespesa.get('data');
  }
  get formaPagamento() {
    return this.formDespesa.get('formaPagamento');
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }


  public adicionarCategoria(): void {
    {
       let categoria = new CategoriaSelecionadaViewModel();
       categoria.id = this.categoriaAtual.id
       categoria.titulo = this.categoriaAtual.titulo
       categoria.selecionada = true;

       this.despesaFormVM.categorias.push(categoria);
       this.categoriasSelecionadas.push(categoria);

       this.formCategoria.reset();
     }
   }

   public removerCategoria(categoria: CategoriaSelecionadaViewModel): void {
     this.despesaFormVM.categorias.forEach((x, index) => {
       if (x === categoria){

         x.selecionada = false;
        }
     })

     this.categoriasSelecionadas.forEach((x, index) => {
      if (x === categoria){

        this.categoriasSelecionadas.splice(index, 1);

       }
     })
   }



  public gravar() {
    if (this.formDespesa.invalid) return;

    this.despesaFormVM = Object.assign({}, this.despesaFormVM, this.formDespesa.value);

 
    this.despesaService.editar(this.despesaFormVM)
      .subscribe({
        next: (despesaEditada) => this.processarSucesso(despesaEditada),
        error: (erro) => this.processarFalha(erro)
      });
  };



  private processarSucesso(despesa: FormsDespesaViewModel) {
    this.router.navigate(['/despesas/listar']);
  }

  private processarFalha(erro: any) {
    console.log(erro);
  }

}
