import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { NovoUsuario } from './novo-usuario';
import { Injectable } from '@angular/core';
import { first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  usuarioJaExiste() {
    return (control:AbstractControl) => {
      return control.valueChanges.pipe(switchMap((nomeUsuario) =>
        this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        map((usuarioExiste) => (usuarioExiste ? { usuarioJaExiste: true } : null)
        ),
        first()
      )
    }
  }
}
