import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['',Validators.compose([Validators.required, Validators.minLength(6)])]
  })

  errorMessage =
  {
    email : [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'email', aviso: 'Email inválido'}],
    senha: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minLength', aviso: 'É necessário ter  no mínimo 6 caracteres'}],
  };
  constructor(private formBuilder: FormBuilder ) { }


  ngOnInit() {
  }

}
