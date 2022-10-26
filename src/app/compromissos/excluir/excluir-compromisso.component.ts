import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CompromissoService } from '../services/compromisso.service';
import { VisualizarCompromissoViewModel } from '../View-Models/visualizar-compromisso.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styles: [
  ]
})
export class ExcluirCompromissoComponent implements OnInit {
  public compromissoFormVM: VisualizarCompromissoViewModel = new VisualizarCompromissoViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService
  ) {
    titulo.setTitle('Excluir Compromisso - e-Agenda');
  }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso']
  }

  public gravar(){

    this.compromissoService.excluir(this.compromissoFormVM.id)
      .subscribe({
        next: (compromissoId) => this.processarSucesso(compromissoId),
        error: (erro) => this.processarFalha(erro)
    })
  }

  private processarSucesso(compromissoId: string): void {
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }
}
