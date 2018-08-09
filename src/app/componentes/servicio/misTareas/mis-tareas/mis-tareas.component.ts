import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../servicios/usuario/usuario.service';
import { ServicioService } from '../../../../servicios/servicio/servicio.service';
import { switchMap } from '../../../../../../node_modules/rxjs-compat/operator/switchMap';
import { Action } from '../../../../../../node_modules/rxjs/internal/scheduler/Action';
import { LocalStorage } from '../../../../../../node_modules/@ngx-pwa/local-storage';

@Component({
  selector: 'app-mis-tareas',
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.css']
})
export class MisTareasComponent implements OnInit {

  empresa: any
  usuarioLogueado: any
  usuario: any
  servicios: any
  termino: any

  registros: any
  orden: any
  pagina: any
  skip: any

  constructor
    (
    private usuarioService: UsuarioService,
    private servicioService: ServicioService,
    private localStorage: LocalStorage
    ) {
    this.usuarioLogueado = 1
    this.servicios = []
    this.usuario = { persona: { nombre: '' }, grupo: { descripcion: '' } }
    this.termino = '0'
    this.registros = '10'
    this.orden = 'DESC'
    this.pagina = 1
    this.skip = 0
  }

  obtenerUnUsuario() {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        //his.router.navigate(['login']);
      } else {
        this.usuario = usuario

        this.usuarioService.obtenerUnUsuario(usuario.id).subscribe(res => {
          this.usuario = res
          var operadores = '['
          this.usuario.operadores.forEach(operador => {
            operadores += '{"operador":"'+operador.id+'"},'
          });
          operadores = operadores.slice(0, operadores.length-1)+"]"
          this.obtenerServiciosGrupo(operadores)
        })
      }
    });


  }


  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        //his.router.navigate(['login']);
      } else {
        this.usuario = usuario
      }
    });
  }

  obtenerServiciosGrupo(grupo) {
 
    switch (this.termino) {
      case '0':
        this.servicioService.obtenerServiciosGrupo(grupo, this.registros, this.skip, this.orden).subscribe(res => {
          this.servicios = res;
        })
        break;
      case '1':
        this.servicioService.obtenerServiciosGrupoEstado(grupo, 'EN ESPERA DE PRODUCCIÓN', this.registros, this.skip, this.orden).subscribe(res => {
          this.servicios = res;
        })
        break;
      case '2':
        this.servicioService.obtenerServiciosGrupoEstado(grupo, 'EN PRODUCCIÓN', this.registros, this.skip, this.orden).subscribe(res => {
          this.servicios = res;
        })
        break;
      case '3':
        this.servicioService.obtenerServiciosGrupoEstado(grupo, 'EN PRODUCCIÓN - PAUSADO', this.registros, this.skip, this.orden).subscribe(res => {
          this.servicios = res;
        })
        break;

      case '4':

        this.servicioService.obtenerServiciosGrupoEstado(grupo, 'POR FACTURAR', this.registros, this.skip, this.orden).subscribe(res => {
          this.servicios = res;
        })

        break;

      default:
        break;
    }
  }


  iniciarServicio(servicio) {
    var confirmacion = confirm("Está seguro que desea dar por iniciada la tarea!");
    if (confirmacion) {
      var fechaActual = new Date();
      this.servicioService.iniciarServicio(servicio.id, fechaActual).subscribe((serv: any) => {
        this.reiniciar()
       
      })
    } else {
    }
  }

  navegarPaginas(accion) {
    var registros = this.servicios.length
    switch (accion) {
      case '+':
        this.pagina = this.pagina + 1
        this.skip = parseInt(this.skip) + parseInt(this.registros)
        break;
      case '-':
        this.pagina = this.pagina - 1
        this.skip = parseInt(this.skip) - parseInt(this.registros)
        break;
      default:
        break;
    }
    this.obtenerServiciosGrupo(this.usuario.grupo.id);
  }

  finalizarServicio(servicio) {
    var confirmacion = confirm("Está seguro que desea dar por finalizada la tarea?");
    if (confirmacion) {
      var fechaActual = new Date();

      this.servicioService.finalizarServicio(servicio.id, fechaActual).subscribe(serv => {
       this.reiniciar()
      })
    } else {

    }
  }

  reiniciar() {
    this.pagina = 1
    this.skip = 0

    var operadores = '['

    this.usuario.operadores.forEach(operador => {
      operadores += '{"operador":"'+operador.id+'"},'
    });
    operadores = operadores.slice(0, operadores.length-1)+"]"
    this.obtenerServiciosGrupo(operadores)
  }

  pausarServicio(servicio) {
    var confirmacion = confirm("Está seguro que desea pausar la operación!");
    if (confirmacion) {
      var fechaActual = new Date();

      this.servicioService.pausarServicio(servicio.id, fechaActual).subscribe((serv: any) => {

        this.servicioService.modificarEstado(servicio.id, 'EN PRODUCCIÓN - PAUSADO', serv.id).subscribe(res => {
        
          this.reiniciar()
        })
      })
    } else {

    }
  }

  reanudarServicio(servicio) {
    var confirmacion = confirm("Está seguro que desea reanudar la tarea?");
    if (confirmacion) {
      var fechaActual = new Date();
      this.servicioService.reanudarServicio(servicio.pausaActual, fechaActual).subscribe(serv => {
        this.servicioService.modificarEstado(servicio.id, 'EN PRODUCCIÓN', '').subscribe(res => {
          this.reiniciar()
        })
      })
    } else {
    }
  }


  ngOnInit() {
    this.obtenerUnUsuario()
  }

}
