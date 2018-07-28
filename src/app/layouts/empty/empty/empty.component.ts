import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '../../../../../node_modules/@angular/router';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  usuario: any
  error: any
  usuarioLogueado: any

  profileForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email],],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public router: Router, 
    private usuarioService: UsuarioService, 
    private localStorage: LocalStorage) {
    this.usuario = {
      correo: '',
      password: ''
    }

    this.error = ''

    this.usuarioLogueado = null;
  }

  ngOnInit() {
    this.buscarSesion()
  }

  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (usuario) {

        this.router.navigate(['/']);
      }
    });
  }

  iniciarSesion() {

    this.usuarioService.login(this.profileForm.value).subscribe((res: any) => {

      if (res.persona.empresa) {

        this.usuarioLogueado = res

        { this.usuarioLogueado.isAdmin = false }
        { this.usuarioLogueado.isTecnico = false }
        { this.usuarioLogueado.isAsesor = false }

        this.usuarioLogueado.roles.forEach(rol => {


          if (rol.id == 1) { this.usuarioLogueado.isAdmin = true }
          if (rol.id == 2) { this.usuarioLogueado.isTecnico = true }
          if (rol.id == 3) { this.usuarioLogueado.isAsesor = true }
        });

        console.log(this.usuarioLogueado)



        this.localStorage.setItem('usuario', this.usuarioLogueado).subscribe((res) => {

          this.router.navigate(['/']);
        });




      } else {
        this.error = 'Existió un error'
      }

    }, error => {
      this.error = 'Correo o contraseña incorrecta'
    })
  }

}
