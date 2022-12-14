import { Component } from '@angular/core';
import { Produto } from '../models/Produto.model';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  listaProdutos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private route: Router) {}

  async buscarProdutos(){
    this.listaProdutos = await this.produtoService.buscarTodos();
    console.log(this.listaProdutos);
  } 

  ionViewWillEnter() {
    this.buscarProdutos();
  }
  
  async paginaCadastro(){
    this.route.navigateByUrl('/produto')
  }

}
