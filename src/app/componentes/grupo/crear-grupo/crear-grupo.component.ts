import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { GrupoService } from '../../../servicios/grupo/grupo.service';
import { PersonaService } from '../../../servicios/persona/persona.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class CrearGrupoComponent implements OnInit {

  usuario: any
  error: any
  usuarioLogueado: any
  id: any;
  usuariosSeleccionados: any
  usuarios: any
  operador: any
  haSidoSeleccionado: any

  grupo = this.fb.group({
    id: [''],
    empresa: ['', [Validators.required]],
    descripcion: ['', [Validators.required],],
  });



  constructor(
    private fb: FormBuilder,
    public router: Router,
    private localStorage: LocalStorage,
    private grupoService: GrupoService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private personaService: PersonaService

  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.buscarSesion()
    this.error = ''
    this.usuariosSeleccionados = []
    this.usuarios = []
    this.haSidoSeleccionado = false
  }

  ngOnInit() {
    if (this.id == 'nuevo') {
      this.buscarSesion()
    } else {
      this.buscarUnGrupoId()
    }

  }

  buscarUnGrupoId() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.usuariosSeleccionados = []
        this.usuarioService.obtenerUsuarios(usuario.persona.empresa.id).subscribe(res => {
          this.usuarios = res
          this.grupoService.obtenerUnGrupo(
            this.id,
            usuario.persona.empresa.id).subscribe((res: any) => {
              if (res[0]) {
                res[0].usuarios.forEach(usuario => {
                  this.personaService.buscarUnaPersonaId(usuario.id, this.usuario.persona.empresa.id).subscribe((resultado: any) => {
                    this.usuarios.forEach(usuario => {
                      usuario.esSeleccionado = false
                      if (usuario.id == resultado[0].id) {
                        this.usuariosSeleccionados.push(resultado[0])
                        //usuario.esSeleccionado = true
                      } else {
                      }
                    });
                  })
                });
                this.grupo = this.fb.group({
                  id: [res[0].id],
                  empresa: [res[0].empresa.id, [Validators.required]],
                  descripcion: [res[0].descripcion, [Validators.required],],
                });
              }
              this.haSidoSeleccionado = true

            })
        })


      }
    });
  }



  seleccionarUsuario(usuario) {
    var usuarios = []
    this.usuariosSeleccionados = []

    switch (usuario.esSeleccionado) {

      case true:
        usuario.esSeleccionado = false
        break;

      case false:
        usuario.esSeleccionado = true
        break;

      default:
        break;
    }

    this.usuarios.forEach(usuario => {

      if (usuario.esSeleccionado == true) {
        usuarios.push(usuario)
      }

      this.usuariosSeleccionados = usuarios

    });

  }


  continuar() {
   
    this.haSidoSeleccionado = true
  }

  seguirSeleccionando() {
    this.haSidoSeleccionado = false
  }




  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        // this.router.navigate(['/']);
      } else {
        this.usuario = usuario

        this.usuarioService.obtenerUsuarios(usuario.persona.empresa.id).subscribe((res: any) => {


          var usuarios = []
          res.forEach(element => {
            if (element.usuario.length == 1) {
              element.esSeleccionado = false
              usuarios.push(element)
            }
          });

          this.usuarios = usuarios
        })

        this.grupo = this.fb.group({
          id: [''],
          empresa: [this.usuario.persona.empresa.id, [Validators.required]],
          descripcion: ['', [Validators.required],],
        });
      }
    });
  }

  guardarGrupo() {
    var descripcion = this.grupo.value.descripcion


    if (this.id == 'nuevo') {

      this.grupoService.obtenerUnGrupoNombre(this.usuario.persona.empresa.id, descripcion).subscribe(res => {
        if (res[0]) {
          this.error = 'El grupo ya existe'
        } else {
          var confirmacion = confirm("¿Está seguro que desea guardar el operador: " + descripcion);
          if (confirmacion) {
            var usuariosSeleccionados = []
            this.usuariosSeleccionados.forEach(element => {
              usuariosSeleccionados.push(element.usuario[0].id)
            });
            this.grupoService.guardarGrupo({ usuarios: usuariosSeleccionados, empresa: this.grupo.value.empresa, descripcion: this.grupo.value.descripcion.trim().toUpperCase() })
              .subscribe(res => {
                if (res) {
                  alert('Grupo guardado satisfactoriamente');
                  this.error = ''
                  this.localStorage.getItem('usuario').subscribe((usuario) => {
                    if (!usuario) {
                      // this.router.navigate(['/']);
                    } else {
                      this.usuario = usuario
                      this.usuariosSeleccionados = []
                      this.haSidoSeleccionado = false
                      this.buscarSesion()
                      this.grupo = this.fb.group({
                        id: [''],
                        empresa: [this.usuario.persona.empresa.id, [Validators.required]],
                        descripcion: ['', [Validators.required],],
                      });
                    }
                  });
                }
              }, error => {
                this.error = 'Existió un error'
              })
          }
        }
      })
    } else {
      var confirmacion = confirm("¿Está seguro que desea modificar el grupo: " + descripcion);

      if (confirmacion) {
        var usuariosSeleccionados = []
        this.usuariosSeleccionados.forEach(element => {
          usuariosSeleccionados.push(element.usuario[0].id)
        });
        this.grupoService.modificarGrupo(this.grupo.value.id, {usuarios: usuariosSeleccionados, descripcion: this.grupo.value.descripcion.trim().toUpperCase() })
          .subscribe((res) => {
            alert('Grupo modificado satisfactoriamente');
            this.grupo = this.fb.group({
              id: [res[0].id],
              empresa: [res[0].empresa, [Validators.required]],
              descripcion: [res[0].descripcion, [Validators.required],],
            });

            this.error = ''

          }, error => {
            this.error = 'Existió un error al modificar el grupo'
          })
      }

    }



  }

}
