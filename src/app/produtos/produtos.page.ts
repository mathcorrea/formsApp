import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../models/Produto.model';
import { Usuario } from '../models/Usuario.model';
import { ProdutosService } from '../services/produtos.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produtosForm = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    descricao: ['',Validators.compose([Validators.required, Validators.minLength(10)])],
    data: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
    preco: ['',Validators.compose([Validators.required, Validators.minLength(1)])]
  })

  errorMessage =
  {
    nome : [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minLenght', aviso: 'É necessário ter  no mínimo 3 caracteres'}],
    descricao: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter  no mínimo 10 caracteres'}],
    data: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter no mínimo 6 caracteres'}],
    preco: [{tipo: 'required' , aviso: 'O campo não pode estar vazio'},{ tipo: 'minlength', aviso: 'É necessário ter  no mínimo 1 caracter'}]
  };

  //continuar aqui
  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private route: Router
    ) { }

  get nome() {
    return this.produtosForm.get('nome');
  }

  get descricao() {
    return this.produtosForm.get('descricao');
  }

  get data() {
    return this.produtosForm.get('data');
  }

  get preco() {
    return this.produtosForm.get('preco');
  }

  produtos: Produto = new Produto();

  ngOnInit() {
  }

  async cadastrar(){
    if(this.produtosForm.valid){
    this.produtos.nome = this.produtosForm.get('nome').value;
    this.produtos.descricao = this.produtosForm.get('descricao').value;
    this.produtos.data = this.produtosForm.get('data').value;
    this.produtos.preco = this.produtosForm.get('preco').value;


    
    }
    
  }
}
