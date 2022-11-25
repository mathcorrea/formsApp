import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  loginForm = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    produto: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
    descricao: ['',Validators.compose([Validators.required, Validators.minLength(10)])],
    data: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
    preco: ['',Validators.compose([Validators.required, Validators.minLength(1)])]
  })

  errorMessage =
  {
    nome : [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minLenght', aviso: 'É necessário ter  no mínimo 3 caracteres'}],
    produto: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter  no mínimo 5 caracteres'}],
    descricao: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter  no mínimo 10 caracteres'}],
    data: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter  no mínimo 6 caracteres'}],
    preco: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter  no mínimo 1 caracter'}]
  };

  //continuar aqui
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: Router
    ) { }

  get nome() {
    return this.loginForm.get('email');
  }

  get peoduto() {
    return this.loginForm.get('senha');
  }

  ngOnInit() {
  }

  async registro(){
    this.route.navigateByUrl('/registro')
  }

  async login(){
    if(this.loginForm.valid){
      const email = this.loginForm.get('email').value;
      const senha = this.loginForm.get('senha').value;
      const usuario: Usuario = (await this.usuarioService.login(email, senha)) as null as Usuario;

      
      if(usuario){
        this.route.navigateByUrl('/tabs/tab1');
      } else {
        alert('E-mail ou senha inválidos!')
      }

    }else{
      alert('Formulário Inválido!')
    }
    
  }
}
