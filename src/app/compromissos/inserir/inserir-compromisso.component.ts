import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissosViewModel } from '../View-Models/form-compromisso-view.model';
import { Tipolocal } from '../View-Models/tipoLocalEnum';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styles: [
  ]
})
export class InserirCompromissoComponent implements OnInit {
 public formCompromisso: FormGroup;
 public contatos = this.contatoService.selecionarTodos();

 public tiposLocal = Object.values(Tipolocal)
    .filter(v => !Number.isFinite(v));

 compromissoFormVM : FormsCompromissosViewModel = new FormsCompromissosViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatoService,
    private router: Router
    ) {
      titulo.setTitle('Cadastrar Compromisso - e-Agenda');
    }

  ngOnInit(): void {
    this.formCompromisso = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      local: ['', [Validators.minLength(3)]],
      tipoLocal: ['', [Validators.required ]],
      link: ['', [Validators.minLength(3)]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contato: ['', [Validators.minLength(3)]],
      contatoId: ['', [Validators.minLength(3)]],
    });
  }

  get assunto() {
    return this.formCompromisso.get('assunto');
  }
  get local() {
    return this.formCompromisso.get('local');
  }
  get tipoLocal() {
    return this.formCompromisso.get('tipoLocal');
  }
  get link() {
    return this.formCompromisso.get('link');
  }
  get data() {
    return this.formCompromisso.get('data');
  }
  get horaInicio() {
    return this.formCompromisso.get('horaInicio');
  }
  get horaTermino() {
    return this.formCompromisso.get('horaTermino');
  }
  get contato() {
    return this.formCompromisso.get('contato');
  }
  get contatoId() {
    return this.formCompromisso.get('contatoId');
  }

  public gravar() {
    if (this.formCompromisso.invalid) return;

    this.compromissoFormVM = Object.assign({}, this.compromissoFormVM, this.formCompromisso.value);

    this.compromissoService.inserir(this.compromissoFormVM)
      .subscribe({
        next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
        error: (erro) => this.processarFalha(erro)
      })
  }

 private processarSucesso(compromisso: FormsCompromissosViewModel): void {
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if(erro) {
      console.error(erro);
    }
  }
}
