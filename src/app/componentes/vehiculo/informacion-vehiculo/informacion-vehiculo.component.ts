import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informacion-vehiculo',
  templateUrl: './informacion-vehiculo.component.html',
  styleUrls: ['./informacion-vehiculo.component.css']
})
export class InformacionVehiculoComponent implements OnInit {

  vehiculo: any;
  id: any

  constructor
  (
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.buscarVehiculoId()
  }

  buscarVehiculoId() {
    this.vehiculoService.obtenerVehiculoId(this.id).subscribe(res=>{
      this.vehiculo = res;
    })
  }

}
