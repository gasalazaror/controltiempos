import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { RolService } from '../../../servicios/rol/rol.service';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';
import { GrupoService } from '../../../servicios/grupo/grupo.service';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { Alert } from '../../../../../node_modules/@types/selenium-webdriver';
import { THIS_EXPR } from '../../../../../node_modules/@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-informacion-persona',
  templateUrl: './informacion-persona.component.html',
  styleUrls: ['./informacion-persona.component.css']
})
export class InformacionPersonaComponent implements OnInit {

  persona: any;
  vehiculos: any;
  id: any;
  roles: any;
  grupos: any;

  constructor
    (
    private personaService: PersonaService,
    private clienteService: ClienteService,
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private grupoService: GrupoService,
    private router: Router,
    private localStorage: LocalStorage
    ) {

    this.grupos = []
    this.id = this.route.snapshot.paramMap.get('id');
    this.vehiculos = []
    this.persona = {
      empresa: 1,
      estado: 'ACTIVO',
      ruc: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      correo: '',
      cliente: [],
      usuario: []
    }

    this.roles = {
      Administrador: false,
      Tecnico: false,
      AsesorServicio: false
    }


  }

  ngOnInit() {
    this.buscarUnaPersonaId();
    this.cargarGrupos()
  }

  cargarGrupos() {

    this.localStorage.getItem('usuario').subscribe((usuario) =>{
      if (usuario) {
        this.grupoService.obtenerGrupos(usuario.persona.empresa.id).subscribe(res => {
          this.grupos = res;
        })
      }
    })
   
  }

  buscarUnaPersonaId() {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.personaService.buscarUnaPersonaId(
          this.id,
          usuario.persona.empresa.id).subscribe(res => {

            if (res[0]) {

              this.persona = res[0]


              if (this.persona.cliente.length > 0) {
                this.clienteService.obtenerCliente(this.persona.cliente[0].id)
                  .subscribe(res => {
                    this.persona.cliente[0] = res;
                  })
              } else {

              }

              if (this.persona.usuario.length > 0) {

                this.usuarioService.obtenerRolesUsuario(this.persona.usuario[0].id).subscribe((res: any) => {

                  res.forEach(roles => {

                    if (roles.id == 1) { this.roles.Administrador = true }
                    if (roles.id == 2) { this.roles.Tecnico = true }
                    if (roles.id == 3) { this.roles.AsesorServicio = true }
                  });
                })
              } else {

              }
            }
          })
      }
    });




  }





  activarCliente() {
    var confirmacion = confirm('¿Está seguro que desea activar el modo cliente');
    if (confirmacion) {
      this.clienteService.activarCliente(this.persona.id).subscribe((res: any) => {
        if (res) {
          alert('Cliente activado');
          this.persona.cliente.push(res)

        } else {
          alert('Ocurrió un error');
        }
      })
    }
  }

  activarUsuario() {
    var confirmacion = confirm('¿Está seguro que desea activar el modo empleado');
    if (confirmacion) {
      this.usuarioService.activarUsuario(this.persona).subscribe((res: any) => {
        if (res) {
          alert('Empleado activado');
          this.persona.usuario.push(res)

        } else {
          alert('Ocurrió un error');
        }
      })
    }
  }

  existeVehiculo(placa) {
    var aux = false
    this.persona.cliente[0].vehiculos.forEach(vehiculo => {

      if (vehiculo.placa == placa) {
        aux = true
      }
    });

    return aux
  }

  cambiarEsDueno(vehiculo, esDueno) {
    if (esDueno) {

      this.vehiculoService.cambiarEsDueno(vehiculo, { dueno: null }).subscribe(res => {
        this.buscarUnaPersonaId()
      })

    } else {

      this.vehiculoService.cambiarEsDueno(vehiculo, { dueno: this.persona.cliente[0].id }).subscribe(res => {
        this.buscarUnaPersonaId()
      })

    }

  }

  desvincularVehiculo(vehiculoPorEliminar, estado) {
    var confirmacion = confirm("¿Está seguro que desea desvincular el vehículo con el cliente")
    if (confirmacion) {
      if (estado) {
        this.vehiculoService.cambiarEsDueno(vehiculoPorEliminar.id, { dueno: null }).subscribe(res => {
          this.buscarUnaPersonaId()
        })
      }
      var vehiculos = []
      this.persona.cliente[0].vehiculos.forEach(vehiculo => {
        if (vehiculoPorEliminar.id != vehiculo.id) {
          vehiculos.push(vehiculo.id)
        }
      });

      this.clienteService.modificarVehiculos
        (
        this.persona.cliente[0].id,
        { vehiculos: vehiculos }
        ).subscribe(res => {
          this.persona.cliente[0] = res
        })
    }


  }

  agregarVehiculo() {
    var placa = prompt('Por favor ingrese el id del vehículo', '');
    if (placa.trim() != '') {
      this.vehiculoService.obtenerUnVehiculo(this.persona.empresa.id, 'placa', placa)
        .subscribe(res => {
          if (res[0]) {


            if (this.existeVehiculo(res[0].placa)) {
              alert('Ya se encuentra asignado el vehículo al cliente seleccionado')
            } else {
              var vehiculos = []

              this.persona.cliente[0].vehiculos.forEach(vehiculo => {
                vehiculos.push(vehiculo.id)
              });

              vehiculos.push(res[0].id)

              this.clienteService.modificarVehiculos(this.persona.cliente[0].id, { vehiculos: vehiculos })
                .subscribe(res => {
                  this.persona.cliente[0] = res
                })

            }



          } else {
            var confirmacion = confirm('No existe el vehículo con la placa ingresada ¿Desea crearlo?')
            if (confirmacion) {
              this.router.navigate(['vehiculo/crearvehiculo/nuevo']);
            } else {

            }

          }
        })
    }




  }

  obtenerRoles() {
    this.rolService.obtenerRoles().subscribe(res => {
      this.roles = res;

    })
  }

  modificarRoles() {
    var roles = []
    if (this.roles.Administrador) { roles.push(1) }
    if (this.roles.Tecnico) {
      roles.push(2)

    

      this.localStorage.getItem('usuario').subscribe((usuario) =>{
        if (usuario) {
          this.usuarioService.crearOperador({descripcion: this.persona.nombre, empresa: usuario.persona.empresa.id})
          .subscribe((res:any)=>{
            if (res) {
              this.usuarioService.modificarUsuario(this.persona.usuario[0].id, { operadores: [res.id] }).subscribe(res => {

              })
            }
          })
        }
      })

     
    } else {
      this.usuarioService.modificarUsuario(this.persona.usuario[0].id, { operadores: [] }).subscribe(res => {

      })
    }
    if (this.roles.AsesorServicio) { roles.push(3) }
    this.personaService.modificarRoles(this.persona.usuario[0].id, { roles: roles }).subscribe(res => {

    })

  }


  verEstado(rol) {
    alert(JSON.stringify(rol))
  }


  cambiarGrupo() {
    this.usuarioService.modificarUsuario(this.persona.usuario[0].id, { grupo: this.persona.usuario[0].grupo })
      .subscribe(res => {
        this.persona.usuario[0].id = res
      })
  }

}
