import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';

import { EmpresaService } from '../../servicios/empresa/empresa.service';
import { PersonaService } from '../../servicios/persona/persona.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  empresa: any
  usuario: any
  error: any



  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.email],],
    lastName: ['', Validators.required],
  });

  usuarioForm = this.fb.group({
    empresa: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService
  ) {
    this.empresa = {
      nombreComercial: ''
    }

    this.usuario = {
      nombre: '',
      correo: '',
      password: ''
    }

    this.error = ''
  }

  ngOnInit() {
  }

  registrarse() {

    this.empresaService.crearEmpresa({ nombreComercial: this.usuarioForm.value.empresa.toUpperCase().trim() }).subscribe(res => {
      if (res) {
        this.empresa = res

        this.personaService.guardarPersona({ nombre: this.usuarioForm.value.nombre.toUpperCase().trim(), correo: this.usuarioForm.value.correo.trim(), empresa: this.empresa.id, estado: 'ACTIVO' }).subscribe((res: any) => {
          if (res) {
            this.usuarioService.activarUsuario({ id: res.id, password: this.usuarioForm.value.password.trim() }).subscribe((res: any) => {
              alert('Usuario registrado correctamente')
              this.usuarioForm.reset()
            }, error => {
              this.error = 'Existió un error al guardar el usuario'
            })
          }
        }, error => {
          this.error = 'Ya existe un usuario registrado con el correo ingresado'
        })
      }
    }, error => {
      this.error = 'La empresa ya existe. Solicite una cuenta al administrador(a) de su empresa'
    })

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }



}
