import { NgModule } from '@angular/core';
import { PetListagemComponent } from './pet-listagem/pet-listagem.component';
import { PetRoutingModule } from './pet-routing.module';
import { PetService } from 'src/app/services/pet.service';
import { PetAdicionarComponent } from './pet-adicionar/pet-adicionar.component';
import { PetAtualizarComponent } from './pet-atualizar/pet-atualizar.component';
import { PetDeletarComponent } from './pet-deletar/pet-deletar.component';
import { NgxMaskModule } from 'ngx-mask';
import { PetVisualizarComponent } from './pet-visualizar/pet-visualizar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PetListagemComponent,
    PetAdicionarComponent,
    PetAtualizarComponent,
    PetDeletarComponent,
    PetVisualizarComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    PetRoutingModule,
    SharedModule
  ],
  providers: [PetService]
})
export class PetModule { }
