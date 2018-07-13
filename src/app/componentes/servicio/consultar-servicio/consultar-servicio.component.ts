import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../servicios/servicio/servicio.service';

@Component({
  selector: 'app-consultar-servicio',
  templateUrl: './consultar-servicio.component.html',
  styleUrls: ['./consultar-servicio.component.css']
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
    })
  }

}
