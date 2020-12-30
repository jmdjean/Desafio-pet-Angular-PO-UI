import { Component, OnInit, ViewChild } from '@angular/core';
import { PoDisclaimer, PoDisclaimerGroup, PoModalAction, PoModalComponent, PoPageAction, PoPageFilter, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dono } from 'src/app/models/dono.module';
import { Pet } from 'src/app/models/pet.module';
import { DonoService } from 'src/app/services/dono.service';
import { PetService } from 'src/app/services/pet.service';
import { ModalService } from 'src/app/services/shared/modal.service';

@Component({
  selector: 'app-pet-listagem',
  templateUrl: './pet-listagem.component.html',
  styleUrls: ['./pet-listagem.component.scss']
})
export class PetListagemComponent implements OnInit {

  constructor(
    private donoService: DonoService,
    private petService: PetService,
    private modalService: ModalService,
    private spinner: NgxSpinnerService
  ) { }

  public nomeFiltro: string;
  public apelidoFiltro: string;
  public racaFiltro: string;
  public especieFiltro: string;
  public nomeDonoFiltro: string;

  public nomeTela = "Pets";
  public pets: Array<Pet>;
  public donos: any[] = [];
  public filtro: string;

  @ViewChild('advancedFilter', { static: true }) advancedFilter: PoModalComponent;

  public readonly advancedFilterPrimaryAction: PoModalAction = {
    action: this.onConfirmAdvancedFilter.bind(this),
    label: 'Pesquisar'
  };

  public readonly advancedFilterSecondaryAction: PoModalAction = {
    action: () => this.advancedFilter.close(),
    label: 'Cancelar'
  };

  public columns: Array<PoTableColumn> = [
    { property: 'name', label: 'Nome' },
    { property: 'nickName', label: 'Apelido' },
    { property: 'breed', label: 'Raça' },
    { property: 'species', label: 'Especie' },
    { property: 'donoName', label: 'Dono' }
  ];

  public readonly disclaimerGroup: PoDisclaimerGroup = {
    change: this.onChangeDisclaimerGroup.bind(this),
    disclaimers: [],
    title: 'Filtros aplicados em nossa pesquisa'
  };

  public readonly filter: PoPageFilter = {
    action: this.pesquisaRapida.bind(this),
    advancedAction: this.openAdvancedFilter.bind(this),
    placeholder: 'Pesquisa rápida ...'
  };

  public readonly actions: Array<PoPageAction> = [
    { action: this.abrirModalAdicionar.bind(this), label: 'Cadastrar', icon: 'po-icon po-icon-plus' }
  ];

  public readonly tableActions: Array<PoTableAction> = [
    { action: this.abriModalVisualizar.bind(this), label: 'Visualizar' },
    { action: this.abriModalEditar.bind(this), label: 'Editar' },
    { action: this.abriModalDeletar.bind(this), label: 'Remover', type: 'danger', separator: true }
  ];

  ngOnInit(): void {
    this.modalService.resultConfirmDialog$.asObservable().subscribe(res => {
      if (res != undefined) {
        if (res.result && res.page === 'pet') {
          this.buscarPets();
        }
      }
    })

    this.buscarPets();
  }

  //#region TABELA
  private onConfirmAdvancedFilter() {
    const addDisclaimers = (property: string, value: string, label: string) =>
      value && this.disclaimerGroup.disclaimers.push({ property, value, label: `${label}: ${value}` });

    this.disclaimerGroup.disclaimers = [];

    addDisclaimers('name', this.nomeFiltro, 'Nome');
    addDisclaimers('nickName', this.apelidoFiltro, 'Apelido');
    addDisclaimers('breed', this.racaFiltro, 'Raça');
    addDisclaimers('species', this.especieFiltro, 'Especie');
    addDisclaimers('donoName', this.nomeDonoFiltro, 'Dono');

    this.advancedFilter.close();
  }

  private openAdvancedFilter() {
    this.advancedFilter.open();
  }

  private onChangeDisclaimerGroup(disclaimers: Array<PoDisclaimer>) {

    disclaimers.forEach(disclaimer => {
      console.log(disclaimer);
    });

    /*  if (!this.searchFilters.search) {
       this.searchTerm = undefined;
     }
 
     this.loadData(this.searchFilters); */
  }

  public OrdenarTabela(event) {
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

  private pesquisaRapida() {
    this.disclaimerGroup.disclaimers = [{
      label: 'Pesquisa rápida: ${this.filtro}',
      property: 'search',
      value: this.filtro
    }];
  }
  //#endregion

  public abrirModalAdicionar() {
    this.modalService.abrirModalCadastroPet();
  }

  public abriModalDeletar(pet: Pet) {
    this.modalService.abrirModalDeletarPet(pet);
  }

  public abriModalEditar(pet: Pet) {
    let petEditar = {
      id: pet.id,
      name: pet.name,
      nickName: pet.nickName,
      ownerId: pet.ownerId,
      breed: pet.breed,
      species: pet.species
    };

    this.modalService.abrirModalAtualizarPet(petEditar);
  }

  public abriModalVisualizar(pet: Pet) {
    this.modalService.abrirModalVisualizarPet(pet);
  }

  public buscarPets() {
    this.spinner.show();

    this.petService.buscarPets()
      .subscribe(res => {
        this.pets = res;
        this.buscarDono();
      }, error => {
        this.pets = [];
        this.spinner.hide();
      });
  }

  public buscarDono() {
    this.donoService.buscarDonos()
      .then(res => {
        this.donos = res.items;
        this.vincularDonoAoPet();

        this.spinner.hide() ;
      }, error => {
        this.donos = [];
        this.spinner.hide();
      });
  }

  public vincularDonoAoPet() {

    this.pets.forEach(pet => {
      let dono = this.donos.find(d => d.id == pet.ownerId);
      if (dono) {
        pet.donoName = dono.name;
        pet.donoPhone = dono.phone;
      }
    });
  }
}
