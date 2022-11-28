import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  listaProdutos: Produto[] = [];


  // sempre que usar um serviço é necessário indicar ele no constructor
  // u minusculo = variavel         U maiusculo = classe
  constructor(private storageService: StorageService) { }

  async salvar(produto: Produto) {
    await this.buscarTodos();
    this.listaProdutos[produto.nome] = produto;
    await this.storageService.set('produtos', this.listaProdutos)
  }

  async buscarUm(nome: string)  {
    await this.buscarTodos();
    return this.listaProdutos[nome];
  }

  async buscarTodos() {
    this.listaProdutos = (await this.storageService.get('produtos')) as null as Produto[];

    if (!this.listaProdutos){
      this.listaProdutos = [];
    }
      return this.listaProdutos; 
  }

  async deletar(nome: string) {
    await this.buscarTodos(); // atualiza a lista de usuarios
    await this.storageService.set('produtos', this.listaProdutos); // salva o array
  }
}
