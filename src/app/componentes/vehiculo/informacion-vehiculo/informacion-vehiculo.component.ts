import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../servicios/vehiculo/vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../../servicios/persona/persona.service';

@Component({
  selector: 'app-informacion-vehiculo',
  templateUrl: './informacion-vehiculo.component.html',
  styleUrls: ['./informacion-vehiculo.component.css']
})
export class InformacionVehiculoComponent implements OnInit {

  vehiculo: any;
  id: any

  duenoActual:any

  constructor
  (
    private vehiculoService: VehiculoService,
    private personaService: PersonaService,
    private route: ActivatedRoute,
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.duenoActual = ''
  }

  ngOnInit() {
    this.buscarVehiculoId()
  }

  buscarVehiculoId() {
    this.vehiculoService.obtenerVehiculoId(this.id).subscribe(res=>{
      this.vehiculo = res;

      this.personaService.buscarUnaPersonaId(this.vehiculo.dueno.persona,this.vehiculo.empresa.id)
      .subscribe(res=>{
       if(res[0]){
        this.duenoActual=res[0].nombre
       }
      })
    })
  }

}
