import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../../servicios/orden/orden.service';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.css']
})
export class ConsultarOrdenComponent implements OnInit {

  empresa:any
  ordenes:any
  usuario:any

  constructor
  (
    private ordenService: OrdenService,
    private localStorage: LocalStorage,
    private router: Router,
  ) { 
    this.empresa = 1
  }

  ngOnInit() {
    this.obtenerOrdenes()
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

  obtenerOrdenes(){
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.ordenService.obtenerOrdenes(usuario.persona.empresa.id).subscribe(res=>{
          this.ordenes = res
        })
      }
    });
  }
}