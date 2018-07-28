import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../servicios/cliente/cliente.service';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ServicioService } from '../../../servicios/servicio/servicio.service';
import { OrdenService } from '../../../servicios/orden/orden.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { NgbModal, ModalDismissReasons } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';

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
  id: any
  terminoCliente: any
  personaSeleccionada: any
  personas: any
  vehiculo: any


  vehiculoSeleccionado: any
  serviciosDisponibles: any
  servicios: any
  closeResult: string;

  registros: any
  pagina: any
  skip: any
  usuario:any

  constructor(
    private clienteService: ClienteService,
    private personaService: PersonaService,
    private servicioService: ServicioService,
    private ordenService: OrdenService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private localStorage: LocalStorage

  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.filtro = 'ID Cliente'
    this.termino = ''
    this.empresa = 1;
    this.personas = []
    this.vehiculoSeleccionado = ''
    this.vehiculos = []
    this.personaSeleccionada = ''
    this.serviciosDisponibles = []
    
    this.registros = '10'
    this.pagina = 1
    this.skip = 0

    this.orden = { cliente: null, vehiculo: null, servicios: [] }
    this.buscarSesion()
    if (this.id != 'nuevo') {
      this.ordenService.obtenerUnaOrden(this.id).subscribe((res: any) => {
        if (res) {
          this.orden = res
          this.ordenService.obtenerServiciosOrden(this.orden.id).subscribe(res => {
            this.orden.servicios = res
          })

          this.vehiculoSeleccionado = res.vehiculo.placa
          this.vehiculo = res.vehiculo
          this.clienteService.obtenerCliente(res.cliente.id).subscribe((res: any) => {
            this.persona = res.persona
            this.personaSeleccionada = res.persona.cedula + " - " + res.persona.nombre
            this.vehiculos = res.pertenencias
          })
        }
      })
    }

  }

  open2(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  navegarPaginas(accion) {
    var registros = this.personas.length
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
    this.obtenerPersonas()
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



  seleccionarPersona(persona) {
    this.persona = persona
    this.personaSeleccionada = persona.cedula + " - " + persona.nombre

    this.clienteService.obtenerCliente(persona.cliente[0].id).subscribe(res => {
      this.orden.cliente = res
      if (this.orden.cliente.pertenencias.length != 0) {
        this.vehiculos = this.orden.cliente.pertenencias
        this.vehiculoSeleccionado = ''
        this.orden.vehiculo = this.vehiculoSeleccionado.vehiculo
      } else {
      }
    })
  }

  seleccionarVehiculo(vehiculo) {
    this.vehiculo = vehiculo
    this.vehiculoSeleccionado = vehiculo.placa
  }


  open(content) {
    this.obtenerPersonas()
    this.modalService2.open(content, { windowClass: 'dark-modal' });
  }

  openServicio(content) {
    this.cargarServicios()

    this.modalService2.open(content, { windowClass: 'dark-modal' });
  }

  open3(content) {
    this.modalService2.open(content, { windowClass: 'dark-modal' });
  }

  reiniciar(){
    this.registros = '10'
    this.pagina = 1
    this.skip = 0
  }


  buscarPersona() {

    this.reiniciar()

    if (this.terminoCliente.length > 2) {
      this.personaService.buscarUnaPersonaSeleccionar(this.terminoCliente.toUpperCase(), this.usuario.persona.empresa.id).subscribe((resultados:any) => {
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

  obtenerPersonas() {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.personaService.obtenerPersonas(usuario.persona.empresa.id, this.registros,this.skip, 'ASC', ).subscribe((res: any) => {
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit() {
    this.cargarServicios()
  }

  anadirServicio() {
    this.orden.servicios.push({ id: 0 })
    alert(JSON.stringify(this.orden.servicios))
  }



  onChange(servicio) {
    this.servicioService.obtenerUnServicio(servicio).subscribe(res => {
      this.orden.servicios.push({ servicio: res });
    })
  }

  seleccionarServicio(servicio) {
    this.orden.servicios.push({ servicio: servicio });
  }



  cargarServicios() {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.servicioService.obtenerServicios(this.usuario.persona.empresa.id).subscribe(res => {
          this.serviciosDisponibles = res
     
        }, error=>{
          
        })
      }
    });
    
  
  }

  eliminarServicio(indice): void {
    this.orden.servicios.splice(indice, 1)
  }


  quitarServicio(servicioRecibido) {
    var nuevosServicios = [];

    this.orden.servicios.forEach(servicio => {
      if (servicio != servicioRecibido) {



        nuevosServicios.push(servicio)
      }
    });

    this.orden.servicios = nuevosServicios
  }

  guardarOrden() {

    var confirmacion = confirm('¿Está seguro que desea guardar la orden de trabajo');

    if (confirmacion) {
      var servicios = []
      this.orden.servicios.forEach(servicio => {

        servicios.push(servicio.servicio.id)
      });



      var nuevaOrden = { cliente: this.persona.cliente[0].id, vehiculo: this.vehiculo.id, empresa: this.usuario.persona.empresa.id }
      this.ordenService.guardarOrden(nuevaOrden).subscribe((res: any) => {
        if (res.id) {
          this.ordenService.modificarOrden(res.id, { servicios: servicios }).subscribe((res: any) => {
            alert('Orden creada correctamente'),
              this.router.navigate(['/orden/informacionorden/' + res.id]);
          }, error => {
            alert('Existió un error al almancenar la orden de trabajo')
          })
        }
      }, error => {
        alert('Existió un error al almancenar la orden de trabajo')
      })
    }



  }

  buscarServicio(termino) {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.servicioService.buscarUnServicioDescripcion(termino, usuario.persona.empresa.id).subscribe(res => {
          this.serviciosDisponibles = res
    
        })
      }
    });

    
  }

  cambiarFiltro() {
    this.reiniciarClienteVehiculo();
  }

  reiniciarClienteVehiculo() {
    this.termino = ''
    this.vehiculos = []
    this.orden.cliente = null
    this.vehiculoSeleccionado = ''
    this.orden.servicios = []
    this.orden.vehiculo = null
    this.orden.cliente = null
  }



}
