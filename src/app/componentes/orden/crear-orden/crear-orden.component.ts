import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { PersonaService } from '../../../servicios/persona/persona.service';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent implements OnInit {

  filtro: any
  filtros = ['ID Cliente', 'ID Vehículo']
  clientes: any
  vehiculos: any
  termino: any
  empresa: any
  persona: any

  clienteSeleccionado: any
  vehiculoSeleccionado: any

  constructor(
    private clienteService: ClienteService,
    private personaService: PersonaService

  ) {
    this.filtro = 'ID Cliente'
    this.termino = ''
    this.empresa = 1;
    this.clienteSeleccionado = null
    this.vehiculoSeleccionado = { posicion: 0, vehiculo: null }
    this.vehiculos = []

  }


  ngOnInit() {
  }

  buscar() {
    switch (this.filtro) {
      case 'ID Cliente':

        this.buscarCliente()

        break;

      case 'ID Vehículo':

        break;

      default:
        break;
    }
  }

  buscarCliente() {
    this.personaService.obtenerUnCliente(this.termino, this.empresa).subscribe((res: any) => {
      if (res[0]) {
        var persona = res[0]

        if (persona.cliente[0]) {

          this.clienteService.obtenerCliente(persona.cliente[0].id).subscribe(res => {
            this.clienteSeleccionado = res

            if (this.clienteSeleccionado.pertenencias.length != 0) {
              this.vehiculos = this.clienteSeleccionado.pertenencias
              this.vehiculoSeleccionado = { posicion: 0, vehiculo: this.vehiculos[0] }
            } else {

            }


          })


        } else {

          this.reiniciarClienteVehiculo()
          var confirmacion = confirm("La persona " + persona.nombre + " con número número de identificación " + this.termino + " no consta como cliente ¿Desea activarlo?")
        }
      } else {
        this.reiniciarClienteVehiculo()
        var confirmacion = confirm("La persona con número número de identificación " + this.termino + " no existe ¿Desea crearlo?")
      }


    })
  }

  cambiarFiltro() {
    this.reiniciarClienteVehiculo()
  }

  reiniciarClienteVehiculo() {
    this.termino = ''
    this.vehiculos = []
    this.clienteSeleccionado = null
    this.vehiculoSeleccionado = { posicion: 0, vehiculo: null }
  }

  navegarVehiculos(condicion) {
    var posicionActual = this.vehiculoSeleccionado.posicion;
    switch (condicion) {
      case '+':

        if (posicionActual == this.vehiculos.length - 1) {
          posicionActual = -1
        }
        this.vehiculoSeleccionado = { posicion: posicionActual + 1, vehiculo: this.vehiculos[posicionActual + 1] }
        break;

      case '-':
        if (posicionActual == 0) {
          posicionActual = this.vehiculos.length
        } else {

        }

        this.vehiculoSeleccionado = { posicion: posicionActual - 1, vehiculo: this.vehiculos[posicionActual - 1] }
        break;

      default:
        break;
    }
  }

}
