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

  async salvar(usuario: Usuario) {
    this.listaUsuarios[usuario.id] = usuario;
    await this.storageService.set('usuarios', this.listaUsuarios)
  }

  async buscarUm()  {}

  async buscarTodos() {
    this.listaUsuarios = await this.storageService.get('usuarios') as unknown as Usuario[];
    if (!this.listaUsuarios){
      return [];
    } 
    return this.listaUsuarios;
  }

  async deletar() {}

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
