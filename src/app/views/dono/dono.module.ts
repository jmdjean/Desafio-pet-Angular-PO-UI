import { NgModule } from '@angular/core';
import { DonoListagemComponent } from './dono-listagem/dono-listagem.component';
import { DonoRoutingModule } from './dono-routing.module.ts.module';
import { NgxMaskModule } from 'ngx-mask';
import { DonoAdicionarComponent } from './dono-adicionar/dono-adicionar.component';
import { DonoAtualizarComponent } from './dono-atualizar/dono-atualizar.component';
import { DonoService } from 'src/app/services/dono.service';
import { DonoDeletarComponent } from './dono-deletar/dono-deletar.component';
import { DonoVisualizarComponent } from './dono-visualizar/dono-visualizar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DonoListagemComponent,
    DonoAdicionarComponent,
    DonoAtualizarComponent,
    DonoDeletarComponent,
    DonoVisualizarComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    DonoRoutingModule,
    SharedModule
  ],
  providers: [DonoService],
})
export class DonoModule { }
