import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { RolService } from '../../../servicios/rol/rol.service';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';

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

  constructor
    (
    private personaService: PersonaService,
    private clienteService: ClienteService,
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router:Router
    ) {
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
    //this.obtenerRoles()
  }

  buscarUnaPersonaId() {

    this.personaService.buscarUnaPersonaId(
      this.id,
      this.persona.empresa).subscribe(res => {

        if (res[0]) {

          this.persona = res[0]
          
          if (this.persona.cliente.length>0) {
            this.clienteService.obtenerCliente(this.persona.cliente[0].id)
            .subscribe(res=>{
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
      this.usuarioService.activarUsuario(this.persona.id).subscribe((res: any) => {
        if (res) {
          alert('Empleado activado');
          this.persona.usuario.push(res)

        } else {
          alert('Ocurrió un error');
        }
      })
    }
  }

  agregarVehiculo(){
   
    var placa = prompt('Por favor ingrese la placa del vehículo', '');

    this.vehiculoService.obtenerUnVehiculo(this.persona.empresa.id, 'placa', placa)
    .subscribe(res=>{
      if (res[0]) {
        alert(JSON.stringify(res[0]))
        
      } else {
        var confirmacion = confirm('No existe el vehículo con la placa ingresada ¿Desea crearlo?')
        if (confirmacion) {
          this.router.navigate(['vehiculo/crearvehiculo/nuevo']);
        } else {
          
        }

      }
    })


  }

  obtenerRoles() {
    this.rolService.obtenerRoles().subscribe(res => {
      this.roles = res;

    })
  }

  modificarRoles() {
    var roles = []
    if (this.roles.Administrador) { roles.push(1) }
    if (this.roles.Tecnico) { roles.push(2) }
    if (this.roles.AsesorServicio) { roles.push(3) }
    this.personaService.modificarRoles(this.persona.usuario[0].id, {roles:roles}).subscribe(res=>{

    })

  }


  verEstado(rol) {
    alert(JSON.stringify(rol))
  }

}
