import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesaRoutingModule } from './despesa-routing.module';
import { ListarDespesaComponent } from './listar/listar-despesa.component';
import { DespesaAppComponent } from './despesa-app.component';
import { DespesaService } from './services/despesa.service';
import { InserirDespesaComponent } from './inserir/inserir-despesa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditarDespesaComponent } from './editar/editar-despesa.component';
import { FormsDespesaResolver } from './services/forms-despesa.resolver';
import { VisualizarDespesaResolver } from './services/visualizar-despesa.resolver';
import { ExcluirDespesaComponent } from './excluir/excluir-despesa.component';


@NgModule({
  declarations: [
    DespesaAppComponent,
    ListarDespesaComponent,
    InserirDespesaComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent
  ],
  imports: [
    CommonModule,
    DespesaRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],

  providers: [DespesaService, FormsDespesaResolver, VisualizarDespesaResolver]
})
export class DespesaModule { }
