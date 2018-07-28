import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-vehiculo',
  templateUrl: './consultar-vehiculo.component.html',
  styleUrls: ['./consultar-vehiculo.component.css']
})
export class ConsultarVehiculoComponent implements OnInit {

  termino: any
  vehiculos: any;
  empresa: any;
  usuario: any

  constructor
    (
    private vehiculoService: VehiculoService,
    private localStorage: LocalStorage,
    private router: Router,
    ) {
    this.termino = '';
    this.vehiculos = []
    this.empresa = 1;
  }

  ngOnInit() {
    this.cargarVehiculos();
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

  buscarVehiculo() {

    
    if (this.termino.length > 2) {

      this.localStorage.getItem('usuario').subscribe((usuario) => {
        if (!usuario) {
  
          this.router.navigate(['login']);
        }else{
       
          this.vehiculoService.buscarUnVehiculo(this.termino.toUpperCase(), this.usuario.persona.empresa.id).subscribe(res => {
            this.vehiculos = res
          }, error => {
            this.cargarVehiculos()
          })
        }
      });

     

    } else {
      this.cargarVehiculos();
    }

  }

  cargarVehiculos() {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {

        this.router.navigate(['login']);
      }else{
        this.vehiculoService.obtenerVehiculos(usuario.persona.empresa.id).subscribe(res => {
          this.vehiculos = res
        })
     
      }
    });

  
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
