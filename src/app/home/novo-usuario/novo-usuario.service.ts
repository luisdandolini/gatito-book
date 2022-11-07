import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private hhtp:HttpClient) { }

  cadastraNovoUsuario(novoUsuario: NovoUsuario){
    return this.hhtp.post('http://localhost:3000/user/signup', novoUsuario);
  }

  verificaUsuarioExistente(nomeUsuario: string){
    return this.hhtp.get('http://localhost:3000/user/exists/' + nomeUsuario);
  }
}
