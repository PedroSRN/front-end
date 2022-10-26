import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoAppComponent } from './contato-app.component';
import { ListarContatoComponent } from './listar/listar-contato.component';
import { ContatoService } from './services/contato.service';
import { InserirContatoComponent } from './inserir/inserir-contato.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { EditarContatoComponent } from './editar/editar-contato.component';
import { FormsContatoResolver } from './services/forms-contato.resolver';
import { ExcluirContatoComponent } from './excluir/excluir-contato.component';
import { VisualizarContatoResolver } from './services/visualizar-contato.resolver';


@NgModule({
  declarations: [
    ContatoAppComponent,
    ListarContatoComponent,
    InserirContatoComponent,
    EditarContatoComponent,
    ExcluirContatoComponent
  ],
  imports: [
    CommonModule,
    ContatoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ContatoService, FormsContatoResolver, VisualizarContatoResolver]
})

export class ContatoModule { }
