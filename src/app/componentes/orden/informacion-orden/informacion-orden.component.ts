import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ServicioService } from '../../../servicios/servicio/servicio.service';
import { OrdenService } from '../../../servicios/orden/orden.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { GrupoService } from '../../../servicios/grupo/grupo.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-informacion-orden',
  templateUrl: './informacion-orden.component.html',
  styleUrls: ['./informacion-orden.component.css']
})
export class InformacionOrdenComponent implements OnInit {

  filtro: any
  filtros = ['ID Cliente', 'ID Vehículo']
  clientes: any
  vehiculos: any
  termino: any
  empresa: any
  persona: any
  orden: any
  id: any
  usuario: any

  vehiculoSeleccionado: any
  serviciosDisponibles: any
  servicios: any
  grupos: any


  constructor
    (
    private clienteService: ClienteService,
    private personaService: PersonaService,
    private servicioService: ServicioService,
    private ordenService: OrdenService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorage,
    private grupoService: GrupoService
    ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.filtro = 'ID Cliente'
    this.termino = ''
    this.empresa = 1;
    this.vehiculoSeleccionado = { posicion: 0, vehiculo: null }
    this.vehiculos = []
    this.serviciosDisponibles = []
    this.orden = { cliente: null, vehiculo: null, servicios: [] }

    if (this.id != 'nuevo') {
      this.ordenService.obtenerUnaOrden(this.id).subscribe((res: any) => {
        if (res) {
          this.orden = res
          this.ordenService.obtenerServiciosOrden(this.orden.id).subscribe((res: any) => {
            res.forEach(servicio => {
              if (!servicio.grupo) {
                servicio.grupo = { id: '', descripcion: 'SIN ASIGNAR' }
              }
            });
            this.orden.servicios = res
          })
          this.clienteService.obtenerCliente(res.cliente.id).subscribe(res => {
            this.orden.cliente = res
            this.vehiculos = this.orden.cliente.pertenencias
            this.vehiculoSeleccionado = this.vehiculoSeleccionado = { posicion: 0, vehiculo: this.orden.vehiculo }
          })
        }
      })
    }
  }

  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        // this.router.navigate(['/']);
      } else {
        this.usuario = usuario
      }
    });
  }

  obtenerGrupos() {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        // this.router.navigate(['/']);
      } else {
        this.grupoService.obtenerGrupos(usuario.persona.empresa.id).subscribe((res: any) => {
          var grupos = []

          grupos.push({ id: '', descripcion: 'SIN ASIGNAR' });

          res.forEach(grupo => {
            grupos.push(grupo)
          });

          this.grupos = grupos;
        })
      }
    });
  }

  cambiarGrupo(servicio, grupo) {



    this.ordenService.obtenerServiciosOrdenId(servicio.id).subscribe((res: any) => {
      if (res) {

        if (!res.grupo) {
          res.grupo = { id: '', descripcion: 'SIN ASIGNAR' }
        }


        var configuracion = confirm('¿Está seguro que desea cambiar el grupo asignado');

        if (configuracion) {

          if (grupo == '') {
            this.ordenService.modificarOrdenServicio(servicio.id, { grupo: null, estado: 'CITA/RECEPCIÓN' }).subscribe((res: any) => {
              servicio.grupo = { id: '', descripcion: 'SIN ASIGNAR' }
              servicio.estado = res.estado
            })

          } else {

            this.ordenService.modificarOrdenServicio(servicio.id, { grupo: grupo, estado: 'EN ESPERA DE PRODUCCIÓN' }).subscribe((res: any) => {
              servicio.grupo = res.grupo
              servicio.estado = res.estado
            }, error => {

            })
          }

        } else {
          servicio.grupo = res.grupo;
        }
      }
    })
  }

  ngOnInit() {
    this.obtenerGrupos()
  }


}
