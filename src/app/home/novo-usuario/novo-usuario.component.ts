import { Router } from '@angular/router';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private NovoUsuarioService: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullName: ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
      userName: ['', [minusculoValidator]],
      password: [''],
      },
      {
        validators: [usuarioSenhaIguaisValidator],
      }
    )
  }

  cadastrar() {
    if(this.novoUsuarioForm.valid && !this.novoUsuarioForm.pending) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.NovoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => {
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error)
      })
    }

  }
}
