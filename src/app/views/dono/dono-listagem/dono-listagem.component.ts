import { Component, OnInit } from '@angular/core';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dono } from 'src/app/models/dono';
import { DonoService } from 'src/app/services/dono.service';
import { ModalService } from 'src/app/services/shared/modal.service';

@Component({
  selector: 'app-dono-listagem',
  templateUrl: './dono-listagem.component.html',
  styleUrls: ['./dono-listagem.component.scss']
})
export class DonoListagemComponent implements OnInit {

  constructor(
    private donoService: DonoService,
    private modalService: ModalService,
    private spinner: NgxSpinnerService
  ) { }

  public nomeTela = "Donos";
  public donos: Array<Dono>;

  public filtro: string;

  public columns: Array<PoTableColumn> = [
    { property: 'name', label: 'Nome' },
    { property: 'email', label: 'Email' },
    { property: 'phone', label: 'Telefone' }
  ];

  public readonly tableActions: Array<PoTableAction> = [
    { action: this.abriModalVisualizar.bind(this), label: 'Visualizar' },
    { action: this.abriModalEditar.bind(this), label: 'Editar' },
    { action: this.abriModalDeletar.bind(this), label: 'Remover', type: 'danger', separator: true }
  ];

  ngOnInit(): void {
    this.donos = [];
    this.modalService.resultConfirmDialog$.asObservable().subscribe(res => {
      if (res != undefined) {
        if (res.result && res.page === 'dono') {
          this.buscarDonos();
        }
      }
    })

    this.buscarDonos();
  }

  //#region TABELA
  OrdenarTabela(event) {
    let params: any = {};

    if (event) {
      params.order = `${event.type === 'ascending' ? '' : '-'}${event.column.property}`;
    }

    if (!params.order.includes('-')) {
      this.donos = this.donos.sort(function (a, b) {
        if (a[event.column.property] > b[event.column.property]) return -1;
        if (a[event.column.property] < b[event.column.property]) return 1;

        return 0;
      });
    }
    else {
      this.donos = this.donos.reverse();
    }
  }
  //#endregion

  //#region MODAL
  public abrirModalAdicionar() {
    this.modalService.abrirModalCadastroDono();
  }

  public abriModalDeletar(dono: Dono) {
    this.modalService.abrirModalDeletarDono(dono);
  }

  public abriModalEditar(dono: Dono) {
    let donoEditar = { id: dono.id, name: dono.name, email: dono.email, phone: dono.phone };
    this.modalService.abrirModalAtualizarDono(donoEditar);
  }

  public abriModalVisualizar(dono: Dono) {
    this.modalService.abrirModalVisualizarDono(dono);
  }
  //#endregion MODAL

  //#region Service
  public buscarDonos() {
    this.spinner.show();

    this.donoService.buscarDonos()
      .subscribe(res => {
        this.donos = res;
        this.spinner.hide();
      }, error => {
        this.donos = [];
        this.spinner.hide();
      });
  }
  //#endregion Service

}
