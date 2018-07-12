import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';

@Component({
  selector: 'app-consultar-vehiculo',
  templateUrl: './consultar-vehiculo.component.html',
  styleUrls: ['./consultar-vehiculo.component.css']
})
export class ConsultarVehiculoComponent implements OnInit {

  termino: any
  vehiculos: any;
  empresa: any;

  constructor(private vehiculoService: VehiculoService) {
    this.termino = '';
    this.vehiculos = []
    this.empresa = 1;
  }

  ngOnInit() {
    this.cargarVehiculos()
  }

  buscarVehiculo() {
    if (this.termino.length > 2) {

      this.vehiculoService.buscarUnVehiculo(this.termino.toUpperCase(), this.empresa).subscribe(res => {
        this.vehiculos = res
      }, error => {
        this.cargarVehiculos()
      })

    } else {
      this.cargarVehiculos();
    }

  }

  cargarVehiculos() {
    this.vehiculoService.obtenerVehiculos(this.empresa).subscribe(res => {
      this.vehiculos = res
    })
  }

  eliminarVehiculo(vehiculo) {
    var confirmacion = confirm("¿Está seguro que desea eliminar el vehículo?");
    if (confirmacion) {
      this.vehiculoService.obtenerVehiculoId(vehiculo).subscribe((res: any) => {
        if (res.clientes.length > 0 || res.ordenes.length > 0) {
          alert('No se puede eliminar este elemento ya que contiene datos relacionados')
        } else {
          this.vehiculoService.eliminarVehiculo(vehiculo).subscribe(res => {
            this.cargarVehiculos()
          }, error => {
            alert('Existió un error al eliminar el vehículo')
          })
        }
      })
    }
  }
}
