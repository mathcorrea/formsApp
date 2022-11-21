import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuarios: Usuario[] = [];


  // sempre que usar um serviço é necessário indicar ele no constructor
  // u minusculo = variavel         U maiusculo = classe
  constructor(private storageService: StorageService) { }

  async login (email: string, senha: string){
    this.buscarTodos();
    let usuario: Usuario;
    this.listaUsuarios.filter(item => {
      if(item.email.toLocaleLowerCase() == email.toLocaleLowerCase()){
      usuario = item;
      }
    });
    if(usuario?.senha === senha){
      return usuario;
    }
    return null;
  }

  async salvar(usuario: Usuario) {
    this.listaUsuarios[usuario.id] = usuario;
    await this.storageService.set('usuarios', this.listaUsuarios)
  }

  async buscarUm(id: number)  {
    this.buscarTodos();
    return this.listaUsuarios[id];
  }

  async buscarTodos() {
    this.listaUsuarios = await this.storageService.get('usuarios') as unknown as Usuario[];
    if (!this.listaUsuarios){
      return [];
    } 
    return this.listaUsuarios;
  }

  async deletar(id: number) {
    this.buscarTodos(); // atualiza a lista de usuarios
    this.listaUsuarios.slice(id,1); // remove o usuario do array
    await this.storageService.set('usuarios', this.listaUsuarios); // salva o array
  }

  async salvarId(id: number)  {
    await this.storageService.set('idUsuario', id);
  }

  async buscarId()  {
    const id = await this.storageService.get('idUsuario');
    if (!id) {
      return 0;
    }
    return id;
  } 
}
