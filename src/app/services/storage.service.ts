import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // _storage é responsável por armazenar os dados no banco do navegador
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // init vai dentro do storage e pede pra criar o banco
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // set guarda informações no banco
  public async set(key: string, value: any) {
   await this._storage?.set(key, value);
  }

  // get pega a informaçao e o return retorna ela pra fora do metodo (nao funciona sem)
  public async get(key: string) {
    return await this._storage.get(key);
  }

  // 
  public async delete(key:string) {
   await this._storage.remove(key)
  }


}