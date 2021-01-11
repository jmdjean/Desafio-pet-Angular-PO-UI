import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dono } from 'src/app/models/dono.module';
import { DonoService } from 'src/app/services/dono.service';

@Component({
  selector: 'app-dono-adicionar',
  templateUrl: './dono-adicionar.component.html',
  styleUrls: ['./dono-adicionar.component.scss']
})
export class DonoAdicionarComponent implements OnInit {

  public dono: Dono = new Dono;
  public modalRef: NgbModalRef;

  public mensagemErroNome = '';
  public mensagemErroEmail = '';
  public mensagemErroTelefone = '';

  public donoAdicionarForm: FormGroup;

  constructor(
    private donoService: DonoService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.limparValidacao();
    this.montarForm();
  }

  public montarForm() {
    this.donoAdicionarForm = this.formBuilder.group({
      name: [this.dono.name, Validators.required, Validators.minLength(3), Validators.maxLength(150)],
      email: [ this.dono.email, Validators.compose([Validators.required, Validators.email])],
      phone: [this.dono.phone, Validators.required, Validators.minLength(10)]
    });
  }

  public salvar() {

    if (this.validarDono()) {
      this.cadastrarDono();
    }
  }

  public cadastrarDono() {
    Object.assign(this.dono, this.donoAdicionarForm.value);

    this.donoService.criarDono(this.dono)
      .then(() => {
        this.toastr.success('', 'Dono cadastrado com sucesso.', { timeOut: 2000 });
        this.modalRef.close({ result: true, page: this.modalRef.componentInstance.page, acao: 'cadastro' });
      }, () => {
        this.toastr.error('', 'Não foi possivel cadastrar o dono!', { timeOut: 2000 });
      });
  }

  public limparValidacao() {
    this.mensagemErroNome = '';
    this.mensagemErroEmail = '';
    this.mensagemErroTelefone = '';
  }

  public validarDono() {
    var donoForm = new Dono();
    Object.assign(donoForm, this.donoAdicionarForm.value);

    this.limparValidacao();

    if (donoForm != undefined) {
      if (donoForm.name == undefined || donoForm.name == '') {
        this.mensagemErroNome = 'Nome inválido.';
      }
      else if (donoForm.name.length < 3) {
        this.mensagemErroNome = 'Nome precisa ter mais de 3 caracteres.';
      }
      else if (donoForm.name.length >= 150) {
        this.mensagemErroNome = 'Nome precisa ter menos de 150 caracteres..';
      }
      if (donoForm.email == undefined || !donoForm.email.includes('@') || !donoForm.email.includes('.com')) {
        this.mensagemErroEmail = 'Email inválido.';
      }
      if (donoForm.phone == undefined || donoForm.phone == '' || donoForm.phone.length < 10) {
        this.mensagemErroTelefone = 'Telefone inválido.';
      }

      if (this.mensagemErroNome || this.mensagemErroEmail || this.mensagemErroTelefone) {
        return false;
      }
      return true;
    }

    return false;
  }

  public fecharModal() {
    this.modalRef.close({ result: false, page: this.modalRef.componentInstance.page, acao: 'cadastro' });
  }
}
