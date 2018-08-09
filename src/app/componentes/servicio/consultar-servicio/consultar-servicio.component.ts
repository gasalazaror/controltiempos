import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../servicios/servicio/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
@Component({
  selector: 'app-consultar-servicio',
  templateUrl: './consultar-servicio.component.html',
  styleUrls: ['./consultar-servicio.component.css'],
})
export class ConsultarServicioComponent implements OnInit {

  termino: any
  servicios: any;
  empresa: any;
  usuario: any

  paginacion: any

  constructor
    (
    private servicioService: ServicioService,
    private localStorage: LocalStorage,
    private router: Router,
  ) {
    this.termino = '';
    this.servicios = []
    this.empresa = 1;
    this.paginacion = {
      registros: '10', orden: 'ASC', pagina: 1, skip: 0
    }
  }

  ngOnInit() {
    this.buscarSesion()
    this.cargarServicios()
  }

  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.usuario = usuario
      }
    });
  }

  buscarServicios() {


    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {

        if (this.termino.length > 2) {
          this.servicioService.buscarServicioPaginacion(this.termino.toUpperCase(), usuario.persona.empresa.id, this.paginacion.registros, this.paginacion.skip, this.paginacion.orden).subscribe(res => {
            this.servicios = res
          }, error => {
            console.log(error)
            this.cargarServicios()
          })
        } else {
          this.cargarServicios()
        }
      }
    });


  }

  cargarServicios() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.servicioService.obtenerServiciosPaginacion(usuario.persona.empresa.id, this.paginacion.registros, this.paginacion.skip, this.paginacion.orden).subscribe(res => {
          this.servicios = res;
          var date = new Date(null);
          date.setMinutes(res[0].tiempoEstandar); // specify value for SECONDS here
          var timeString = date.toISOString().substr(11, 8);
          //alert(timeString)
        })
      }
    });

  }


  navegarPaginas(accion) {
    switch (accion) {
      case '+':
        this.paginacion.pagina = this.paginacion.pagina + 1
        this.paginacion.skip = parseInt(this.paginacion.skip) + parseInt(this.paginacion.registros)
        break;
      case '-':
        this.paginacion.pagina = this.paginacion.pagina - 1
        this.paginacion.skip = parseInt(this.paginacion.skip) - parseInt(this.paginacion.registros)
        break;
      default:
        break;
    }
    if (this.termino == '') {
      this.cargarServicios()
    } else {
      this.buscarServicios()
    }

  }

  reiniciar() {
    this.paginacion.pagina = 1
    this.paginacion.skip = 0

    if (this.termino = '') {
      this.cargarServicios()
    } else {
      this.buscarServicios()
    }


  }

  eliminarServicio(servicio) {

    this.servicioService.obtenerUnServicio(servicio.id).subscribe((res: any) => {
      if (res.ordenServicio.length == 0) {
        var confirmacion = confirm("¿Está seguro que desea eliminar el servicio: " + servicio.descripcion)
        if (confirmacion) {

          this.servicioService.eliminarServicio(servicio.id).subscribe(res => {
            this.cargarServicios()
            alert('Servicio eliminado correctamente');

          }, error => {
            alert('Existió un error al eliminar el servicio: ' + servicio.descripcion)
          })
        }
      } else {
        alert('No se puede eliminar el servicio ' + servicio.descripcion + "ya que contiene información relacionada")
      }
    })
  }

}
