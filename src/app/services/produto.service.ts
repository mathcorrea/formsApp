import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  listaProdutos: Produto[] = [];

  constructor(private storageService: StorageService) { }

  async salvar(produto:Produto){
    await this.buscarTodos();
    this.listaProdutos[produto.id]= produto;
    await this.storageService.set('produtos', this.listaProdutos);
  }

  async buscarUm(id: number){
    await this.buscarTodos();
    return this.listaProdutos[id];
  }

  async buscarTodos(){
    this.listaProdutos = await this.storageService.get('produtos') as unknown as Produto[];
    if(!this.listaProdutos){
      this.listaProdutos = [];
    }
    return this.listaProdutos;
  }

  async deletar(id: number){
   await this.buscarTodos(); 
    this.listaProdutos.slice(id, 1);
    await this.storageService.set('produtos',this.listaProdutos);  
  }

  async salvarId(id: number){
    await this.storageService.set('idProduto', id);
  }

  async buscarId(){
    const id =  await this.storageService.get('idProduto');
    if(!id){
      return 0;
    }
    return id;
  }

}
