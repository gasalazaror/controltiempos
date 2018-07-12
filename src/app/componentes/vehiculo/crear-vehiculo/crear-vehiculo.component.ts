import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {

  vehiculo: any;
  error: any;
  id: any

  constructor
    (
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
    ) {

      this.vehiculo = {
        empresa: 1,
        marca: '',
        modelo: '',
        anio: '',
        numeroChasis: '',
        numeroMotor: '',
        placa: '',
        color: ''
      }
  
      this.error = {
        marca: '',
        modelo: '',
        anio: '',
        numeroChasis: '',
        numeroMotor: '',
        placa: '',
        color: ''
      }

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id=='nuevo') {
     
      
    } else {

      this.buscarVehiculoId()
      
    }

   

  }

  ngOnInit() {
  }

  buscarVehiculoId() {
    this.vehiculoService.obtenerVehiculoId(this.id).subscribe(res => {
      this.vehiculo = res;
    })
  }

  reanudar() {

    this.vehiculo = {
      empresa: 1,
      marca: '',
      modelo: '',
      anio: '',
      numeroChasis: '',
      numeroMotor: '',
      placa: '',
      color: '',
    }

    this.error = {
      marca: '',
      modelo: '',
      anio: '',
      numeroChasis: '',
      numeroMotor: '',
      placa: '',
      color: ''
    }

  }


  buscarUnVehiculoPlaca() {
    this.vehiculoService.obtenerUnVehiculo(this.vehiculo.empresa, 'placa', this.vehiculo.placa.trim().toUpperCase()).subscribe(res => {
      if (res[0]) {
        this.error.placa = "El vehículo con la placa ingresada ya existe en la base de datos "
      } else {
        this.error.placa = ""
      }
    })
  }

  validarPlaca() {
    if (this.vehiculo.placa.trim() == '') {
      this.error.placa = 'La placa del vehículo es requerida'
    } else {
      this.error.placa = ''
      this.buscarUnVehiculoPlaca()
    }
  }

  validarMarca() {
    if (this.vehiculo.marca.trim() == '') {
      this.error.marca = 'La marca del vehículo es requerida'
    } else {
      this.error.marca = ''
    }
  }

  validarModelo() {
    if (this.vehiculo.modelo.trim() == '') {
      this.error.modelo = 'El modelo del vehículo es requerido'
    } else {
      this.error.modelo = ''
    }
  }

  validarNumeroChasis() {

  }

  validarNumeroMotor() {

  }

  validarAnio() {
    var anio = ''
    anio = this.vehiculo.anio + ""
    if (anio.trim() == '') {

      this.error.anio = 'El año del vehículo es requerido'
    } else if (anio.length != 4) {
      this.error.anio = "El año del vehículo debe constar de 4 digitos"
    } else {
      this.error.anio = ''
    }
  }

  validarColor() {

  }

  guardarVehiculo() {

    var confirmacion = confirm('¿Está seguro que desea guardar la información del vehículo');
    if (confirmacion) {

      if (this.id=='nuevo') {
        
      this.vehiculoService.guardarVehiculo(this.vehiculo).subscribe(res => {
        alert("Vehículo guardado correctamente")
        this.vehiculo = res
        this.router.navigate(['/vehiculo/informacionvehiculo/' + this.vehiculo.id]);
      }, error => {
        alert("Existió un error al guardar el vehículo")
      })
        
      } else {

        this.vehiculoService.modificarVehiculo
        (
          this.vehiculo.id,
          {modelo: this.vehiculo.modelo.toUpperCase(), marca: this.vehiculo.marca, color: this.vehiculo.color, numeroChasis: this.vehiculo.numeroChasis, numeroMotor: this.vehiculo.numeroMotor  }
        ).subscribe(res=>{
          alert('Vehículo modificado correctamente')
          this.router.navigate(['/vehiculo/informacionvehiculo/' + this.vehiculo.id]);
        }, error=>{
          alert("Existió un error al modificar el vehículo")
        })
        
      }





    } else {

    }


  }

}
