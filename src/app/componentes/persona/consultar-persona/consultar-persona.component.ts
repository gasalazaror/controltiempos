import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../servicios/persona/persona.service';

@Component({
  selector: 'app-consultar-persona',
  templateUrl: './consultar-persona.component.html',
  styleUrls: ['./consultar-persona.component.css']
})
export class ConsultarPersonaComponent implements OnInit {

  termino: any
  personas: any;
  empresa: any;


  constructor(private personaService: PersonaService) {
    this.termino = '';
    this.personas = []
    this.empresa = 1;
  }

  ngOnInit() {
    this.cargarPersonas()
  }

  buscarPersona() {
    if (this.termino.length > 2) {
      this.personaService.buscarUnaPersona(this.termino.toUpperCase(), this.empresa).subscribe(res => {
        this.personas = res
      }, error=>{
       this.cargarPersonas()
      })
    } else {
     this.cargarPersonas()
    }
  }

  cargarPersonas(){
    this.personaService.obtenerPersonas(this.empresa).subscribe(res=>{
      this.personas = res;
    })
  }

}
