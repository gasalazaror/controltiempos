import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { RolService } from '../../../servicios/rol/rol.service';

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
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private rolService: RolService
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
      cliente: []
    }
  }

  ngOnInit() {
    this.buscarUnaPersonaId();
    this.obtenerRoles()
  }

  buscarUnaPersonaId() {

    this.personaService.buscarUnaPersonaId(
      this.id,
      this.persona.empresa).subscribe(res => {

        if (res[0]) {

          this.persona = res[0]
        }
      })
  }



  activarCliente() {
    var confirmacion = confirm('¿Está seguro que desea activar el modo cliente');
    if (confirmacion) {
      this.clienteService.activarCliente(this.persona.id).subscribe((res: any) => {
        if (res) {
          alert('Cliente activado');
          this.persona.cliente.push(res.id)

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
          this.persona.usuario.push(res.id)

        } else {
          alert('Ocurrió un error');
        }
      })
    }
  }

  obtenerRoles(){
    this.rolService.obtenerRoles().subscribe(res=>{
      this.roles = res;
   
    })
  }

}
