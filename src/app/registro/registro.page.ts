import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

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
    senha: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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

  pessoa = {};
  usuario: Usuario = new Usuario();

  constructor(
    private bd: StorageService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: Router
    ) { }

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

  async salvar(){
    if(this.registroForm.valid){
    this.usuario.nome = this.registroForm.get('nome').value;
    this.usuario.email = this.registroForm.get('email').value;
    this.usuario.cpf = this.registroForm.get('cpf').value;
    this.usuario.senha = this.registroForm.get('senha').value;

    const id = await this.usuarioService.buscarId() as number;

    this.usuario.id = id;

    this.usuarioService.salvar(this.usuario);
   
    this.usuarioService.salvarId(id+1);
    alert('Sucesso!!')
    this.route.navigateByUrl('/login')

    }else {
      alert('Formulário Inválido!')
    }
  }
}