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
  usuario:any

  constructor
  (
    private servicioService: ServicioService,
    private localStorage: LocalStorage,
    private router: Router,
  ) {
    this.termino = '';
    this.servicios = []
    this.empresa = 1;
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
          this.servicioService.buscarUnServicio(this.termino.toUpperCase(), usuario.persona.empresa.id ).subscribe(res => {
            this.servicios = res
          }, error => {
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

        this.servicioService.obtenerServicios(usuario.persona.empresa.id).subscribe(res => {
          this.servicios = res;
    
        
          var date = new Date(null);
          date.setMinutes(res[0].tiempoEstandar); // specify value for SECONDS here
          var timeString = date.toISOString().substr(11, 8);
          //alert(timeString)
        })
      }
    });
 
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
