import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../servicios/servicio/servicio.service';
@Component({
  selector: 'app-consultar-servicio',
  templateUrl: './consultar-servicio.component.html',
  styleUrls: ['./consultar-servicio.component.css'],
})
export class ConsultarServicioComponent implements OnInit {

  termino: any
  servicios: any;
  empresa: any;

  constructor(private servicioService: ServicioService) {
    this.termino = '';
    this.servicios = []
    this.empresa = 1;
  }

  ngOnInit() {
    this.cargarServicios()
  }

  buscarServicios() {
    if (this.termino.length > 2) {
      this.servicioService.buscarUnServicio(this.termino.toUpperCase(), this.empresa).subscribe(res => {
        this.servicios = res
      }, error => {
        this.cargarServicios()
      })
    } else {
      this.cargarServicios()
    }

  }

  cargarServicios() {
    this.servicioService.obtenerServicios(this.empresa).subscribe(res => {
      this.servicios = res;

    
      var date = new Date(null);
      date.setMinutes(res[0].tiempoEstandar); // specify value for SECONDS here
      var timeString = date.toISOString().substr(11, 8);
  

      //alert(timeString)
    })
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
