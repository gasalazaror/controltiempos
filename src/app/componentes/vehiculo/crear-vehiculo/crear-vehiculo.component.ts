import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {


  vehiculo: any;
  error: any;
  id: any
  personas: any;
  personaSeleccionada: any
  terminoCliente: any
  empresa: any
  usuario:any

  registros: any
  pagina: any
  skip: any


  constructor
    (
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private personaService: PersonaService,
    private clienteService: ClienteService,
    private localStorage: LocalStorage

    ) {

    this.registros = '10'
    this.pagina = 1
    this.skip = 0

    this.personaSeleccionada = ''
    this.terminoCliente = ''
    this.empresa = 1
    this.vehiculo = {
      empresa: { id: 1 },
      marca: '',
      modelo: '',
      anioFabricacion: '',
      numeroChasis: '',
      numeroMotor: '',
      placa: '',
      color: '',
      dueno: null
    }

    this.error = {
      marca: '',
      modelo: '',
      anioFabricacion: '',
      numeroChasis: '',
      numeroMotor: '',
      placa: '',
      color: ''
    }

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id == 'nuevo') {


    } else {

      this.buscarVehiculoId()

    }



  }

  ngOnInit() {
  this.buscarSesion()
  }

  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {

        this.router.navigate(['login']);
      }else{
        this.usuario = usuario
      }
    });
  }

  open(content) {
    this.obtenerPersonas()
    this.modalService2.open(content, { windowClass: 'dark-modal' });
  }

  obtenerPersonas() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {

        
      }else{
        this.personaService.obtenerPersonas(usuario.persona.empresa.id, this.registros, this.skip, 'ASC').subscribe((res: any) => {
          var personas = []
    
    
          res.forEach(persona => {
    
            if (persona.cliente.length == 1) {
              personas.push(persona)
            }
          });
          this.personas = personas
        })
      }
    });


    
  }

  buscarVehiculoId() {
    this.vehiculoService.obtenerVehiculoId(this.id).subscribe((res: any) => {
      if (!res.dueno) {


      } else {

        this.clienteService.obtenerCliente(res.dueno.id).subscribe((res: any) => {
          this.vehiculo.dueno = res.id

          this.personaSeleccionada = res.persona.cedula + " - " + res.persona.nombre
        })
      }
      this.vehiculo = res;



    })


  }

  reanudar() {

    this.vehiculo = {
      empresa: 1,
      marca: '',
      modelo: '',
      anioFabricacion: '',
      numeroChasis: '',
      numeroMotor: '',
      placa: '',
      color: '',
    }

    this.error = {
      marca: '',
      modelo: '',
      anioFabricacion: '',
      numeroChasis: '',
      numeroMotor: '',
      placa: '',
      color: ''
    }

  }


  buscarUnVehiculoPlaca() {
 
    this.vehiculoService.obtenerUnVehiculo(this.usuario.persona.empresa.id, 'placa', this.vehiculo.placa.trim().toUpperCase()).subscribe(res => {
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
    anio = this.vehiculo.anioFabricacion + ""
    if (anio.trim() == '') {

      this.error.anioFabricacion = 'El año del vehículo es requerido'
    } else if (anio.length != 4) {
      this.error.anioFabricacion = "El año del vehículo debe constar de 4 digitos"
    } else {
      this.error.anioFabricacion = ''
    }
  }

  validarColor() {

  }

  seleccionarPersona(persona) {
    this.vehiculo.dueno = persona.cliente[0].id
    this.personaSeleccionada = persona.cedula + " - " + persona.nombre


  }

  buscarPersona() {

    if (this.terminoCliente.length > 2) {
      this.personaService.buscarUnaPersonaSeleccionar(this.terminoCliente.toUpperCase(), this.usuario.persona.empresa.id).subscribe((resultados: any) => {
        var personas = []


        resultados.forEach(persona => {

          if (persona.cliente.length == 1) {
            personas.push(persona)
          }
        });

        this.personas = personas

      }, error => {
        this.obtenerPersonas()
      })
    } else {
      this.obtenerPersonas()
    }
  }

  guardarVehiculo() {

    this.vehiculo.empresa = this.usuario.persona.empresa.id
    var confirmacion = confirm('¿Está seguro que desea guardar la información del vehículo');
    if (confirmacion) {

      if (this.id == 'nuevo') {



        this.vehiculoService.guardarVehiculo(this.vehiculo).subscribe(res => {
          alert("Vehículo guardado correctamente")
          this.vehiculo = res
          this.reanudar()
         // this.router.navigate(['/vehiculo/informacionvehiculo/' + this.vehiculo.id]);
        }, error => {
          alert("Existió un error al guardar el vehículo")
          alert(JSON.stringify(error))
        })

      } else {


      

        this.vehiculoService.modificarVehiculo
          (
          this.vehiculo.id,
          { modelo: this.vehiculo.modelo.toUpperCase(), marca: this.vehiculo.marca, color: this.vehiculo.color, numeroChasis: this.vehiculo.numeroChasis, numeroMotor: this.vehiculo.numeroMotor, dueno: this.vehiculo.dueno }
          ).subscribe(res => {
            alert('Vehículo modificado correctamente')
           // this.router.navigate(['/vehiculo/informacionvehiculo/' + this.vehiculo.id]);
          }, error => {
            alert("Existió un error al modificar el vehículo")
          })

      }





    } else {

    }


  }

}
