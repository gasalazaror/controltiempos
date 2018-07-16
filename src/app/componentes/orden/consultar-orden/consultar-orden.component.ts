import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../../servicios/orden/orden.service';

@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.css']
})
export class ConsultarOrdenComponent implements OnInit {

  empresa:any
  ordenes:any

  constructor(private ordenService: OrdenService) { 
    this.empresa = 1
  }

  ngOnInit() {
    this.obtenerOrdenes()
  }

  obtenerOrdenes(){
    this.ordenService.obtenerOrdenes(this.empresa).subscribe(res=>{
      this.ordenes = res
    })
  }

}
