import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ServicioService } from '../../../servicios/servicio/servicio.service';
import { OrdenService } from '../../../servicios/orden/orden.service';

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
  orden: any


  vehiculoSeleccionado: any
  serviciosDisponibles: any
  servicios: any

  constructor(
    private clienteService: ClienteService,
    private personaService: PersonaService,
    private servicioService: ServicioService,
    private ordenService: OrdenService

  ) {
    this.filtro = 'ID Cliente'
    this.termino = ''
    this.empresa = 1;

    this.vehiculoSeleccionado = { posicion: 0, vehiculo: null }
    this.vehiculos = []
    this.serviciosDisponibles = []
    this.orden = { cliente: null, vehiculo: null, servicios: [] }

  }


  ngOnInit() {
    this.cargarServicios()
  }

  anadirServicio() {
    this.orden.servicios.push({ id: 0 })
    alert(JSON.stringify(this.orden.servicios))
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

  onChange(servicio) {


    this.servicioService.obtenerUnServicio(servicio).subscribe(res => {
      this.orden.servicios.push(res);

    })


  }

  buscarCliente() {
    this.personaService.obtenerUnCliente(this.termino, this.empresa).subscribe((res: any) => {
      if (res[0]) {
        var persona = res[0]

        if (persona.cliente[0]) {

          this.clienteService.obtenerCliente(persona.cliente[0].id).subscribe(res => {
            this.orden.cliente = res

            if (this.orden.cliente.pertenencias.length != 0) {
              this.vehiculos = this.orden.cliente.pertenencias
              this.vehiculoSeleccionado = { posicion: 0, vehiculo: this.vehiculos[0] }
              this.orden.vehiculo = this.vehiculoSeleccionado.vehiculo
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

  cargarServicios() {
    this.servicioService.obtenerServicios(this.empresa).subscribe(res => {
      this.serviciosDisponibles = res
    })
  }

  guardarOrden() {
    var servicios = []

    this.orden.servicios.forEach(servicio => {
      servicios.push(servicio.id)
    });
    var nuevaOrden = { cliente: this.orden.cliente.id, vehiculo: this.orden.vehiculo.id, servicios: servicios, empresa: this.empresa }

    alert(JSON.stringify(nuevaOrden))
    this.ordenService.guardarOrden(nuevaOrden).subscribe(res => {
      alert('Se ha guardado correctamente la orden')
    })

  }

  buscarServicio(termino) {

    this.servicioService.buscarUnServicioDescripcion(termino, this.empresa).subscribe(res => {
      this.serviciosDisponibles = res

    })
  }

  cambiarFiltro() {
    this.reiniciarClienteVehiculo()
  }

  reiniciarClienteVehiculo() {
    this.termino = ''
    this.vehiculos = []
    this.orden.cliente = null
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
        this.orden.vehiculo = this.vehiculoSeleccionado.vehiculo
        break;

      case '-':
        if (posicionActual == 0) {
          posicionActual = this.vehiculos.length
        } else {

        }

        this.vehiculoSeleccionado = { posicion: posicionActual - 1, vehiculo: this.vehiculos[posicionActual - 1] }
        this.orden.vehiculo = this.vehiculoSeleccionado.vehiculo
        break;

      default:
        break;
    }
  }

}
