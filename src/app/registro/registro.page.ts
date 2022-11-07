import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
    senha: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
    confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  })

  errorMessage =
  {
    nome : [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter no mínimo 3 caracteres'}],
    email : [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'email', aviso: 'Email inválido'}],
    cpf : [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter 11 caracteres'},{ tipo: 'maxlength', aviso: 'É necessário ter 11 caracteres'}],
    senha: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter no mínimo 6 caracteres'}],
    confirmaSenha : [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter no mínimo 6 caracteres'}],
  };
  

  CadForm = this.formBuilder.group({
    nome:  ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['',Validators.compose([Validators.required, Validators.minLength(6)])]
  })
  constructor( private formBuilder: FormBuilder ) { }

  get nome() {
    return this.registroForm.get('nome');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get cpf() {
    return this.registroForm.get('cpf');
  }

  get senha() {
    return this.registroForm.get('senha');
  }

  get confirmaSenha() {
    return this.registroForm.get('confirmaSenha');
  }

  ngOnInit() {
  }
}