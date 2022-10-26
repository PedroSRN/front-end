import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissosViewModel } from '../View-Models/form-compromisso-view.model';
import { Tipolocal } from '../View-Models/tipoLocalEnum';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styles: [
  ]
})
export class EditarCompromissoComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
    ) {
      titulo.setTitle('Editar Compromisso - e-Agenda');
    }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso']

    this.formCompromisso = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      local: ['', [Validators.minLength(3)]],
      tipoLocal: ['', [Validators.required ]],
      link: ['', [Validators.minLength(3)]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contato: [''],
      contatoId: ['', [Validators.minLength(3)]],
    });

    this.formCompromisso.patchValue({
        id: this.compromissoFormVM.id,
        assunto: this.compromissoFormVM.assunto,
        local: this.compromissoFormVM.local,
        tipoLocal: this.compromissoFormVM.tipoLocal,
        link: this.compromissoFormVM.link,
        data: this.compromissoFormVM.data.toString().split("T")[0],
        horaInicio: this.compromissoFormVM.horaInicio,
        horaTermino: this.compromissoFormVM.horaTermino,
        contatoId: this.compromissoFormVM.contatoId,
      })
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

    this.compromissoService.editar(this.compromissoFormVM)
      .subscribe({
        next: (compromissoEditado) => this.processarSucesso(compromissoEditado),
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
