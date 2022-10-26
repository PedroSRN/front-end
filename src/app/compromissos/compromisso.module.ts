import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompromissoRoutingModule } from './compromisso-routing.module';
import { CompromissoAppComponent } from './compromisso-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { InserirCompromissoComponent } from './inserir/inserir-compromisso.component';
import { CompromissoService } from './services/compromisso.service';
import { ContatoService } from '../contatos/services/contato.service';
import { FormsContatoResolver } from '../contatos/services/forms-contato.resolver';
import { EditarCompromissoComponent } from './editar/editar-compromisso.component';
import { FormsCompromissoResolver } from './services/forms-compromisso.resolver';
import { ExcluirCompromissoComponent } from './excluir/excluir-compromisso.component';
import { VisualizarCompromissoResolver } from './services/visualizar-comprosso.resolver';


@NgModule({
  declarations: [
    CompromissoAppComponent,
    ListarCompromissoComponent,
    InserirCompromissoComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [CompromissoService, ContatoService, FormsCompromissoResolver, VisualizarCompromissoResolver]
})
export class CompromissoModule { }
