import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Dono } from 'src/app/models/dono.module';
import { Pet } from 'src/app/models/pet.module';
import { DonoService } from 'src/app/services/dono.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-adicionar',
  templateUrl: './pet-adicionar.component.html',
  styleUrls: ['./pet-adicionar.component.scss']
})
export class PetAdicionarComponent implements OnInit {

  public donos: any[] = [];
  public pet: Pet = new Pet;
  public modalRef: NgbModalRef;

  public mensagemErroNome = '';
  public mensagemErroApelido = '';
  public mensagemErroRaca = '';
  public mensagemErroEspecie = '';
  public mensagemErroDono = '';

  public petAdicionarForm: FormGroup;

  constructor(
    private donoService: DonoService,
    private petService: PetService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.donos = [];
    this.buscarDono();
    this.limparValidacao();
    this.montarForm();
  }

  public montarForm() {
    this.petAdicionarForm = this.formBuilder.group({
      name: [this.pet.name, Validators.required, Validators.minLength(3), Validators.maxLength(150)],
      nickName: [ this.pet.nickName, Validators.required],
      breed: [this.pet.breed, Validators.required],
      species: [this.pet.species, Validators.required],
      ownerId: [this.pet.ownerId, Validators.required]
    });
  }

  public salvar() {
    if (this.validar()) {
      this.cadastrar();
    }
  }

  public cadastrar() {
    Object.assign(this.pet, this.petAdicionarForm.value);

    this.petService.criarPet(this.pet)
      .subscribe(() => {
        this.toastr.success('', 'Pet cadastrado com sucesso.', { timeOut: 2000 });
        this.modalRef.close({ result: true, page: this.modalRef.componentInstance.page, acao: 'cadastro' });
    }, () => {
      this.toastr.error('', 'Não foi possivel cadastrar o pet!', { timeOut: 2000 });
    });
  }

  public limparValidacao() {
    this.mensagemErroNome = '';
    this.mensagemErroApelido = '';
    this.mensagemErroRaca = '';
    this.mensagemErroEspecie = '';
    this.mensagemErroDono = '';
  }

  public validar() {
    this.limparValidacao();

    let petForm = new Pet();
    Object.assign(petForm, this.petAdicionarForm.value);
    
    if (this.pet != undefined) {
      /* NOME */
      if (petForm.name == undefined || this.pet.name == '') {
        this.mensagemErroNome = 'Nome inválido.';
      }

      /* NICKNAME */
      if (petForm.nickName == undefined || petForm.nickName == '') {
        this.mensagemErroApelido = 'Apelido inválido.';
      }

      /* RAÇA */
      if (petForm.breed == undefined || petForm.breed == '') {
        this.mensagemErroRaca = 'Raça inválida.';
      }

      /* ESPECIE */
      if (petForm.species == undefined || petForm.species == '') {
        this.mensagemErroEspecie = 'Especie inválida.';
      }

      /* DONO */
      if (petForm.ownerId == undefined || petForm.ownerId == '') {
        this.mensagemErroDono = 'Dono inválido.';
      }

      if (this.mensagemErroNome || this.mensagemErroApelido || this.mensagemErroRaca || this.mensagemErroEspecie || this.mensagemErroDono) {
        return false;
      }
      return true;
    }

    return false;
  }

  public fecharModal() {
    this.modalRef.close({ result: false, page: this.modalRef.componentInstance.page, acao: 'cadastro' });
  }

  public buscarDono() {

    this.donoService.buscarDonosObservable()
    .subscribe(res => {
      this.donos = res;
    });
   /*  this.donoService.buscarDonos()
      .then(res => {
        this.donos = res.items;
        //this.petAdicionarForm.ownerId.setValue
        //this.petAdicionarForm.controls['ownerId'].setValue(selected.id);
        this.spinner.hide();
      }, error => {
        this.donos = [];
        this.spinner.hide();
      });

      */
  } 

  
}
