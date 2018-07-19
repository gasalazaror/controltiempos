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

  registros: any
  orden: any
  pagina: any
  skip: any



  constructor(private personaService: PersonaService) {
    this.termino = '';
    this.personas = []
    this.empresa = 1;

    this.registros = '10'
    this.orden = 'DESC'
    this.pagina = 1
    this.skip = 0
  }

  ngOnInit() {
    this.cargarPersonas()
  }

  buscarPersona() {
    this.pagina = 1
    this.skip = 0
    if (this.termino.length > 2) {
      this.personaService.buscarUnaPersona(this.termino.toUpperCase(), this.empresa, this.registros, this.skip, this.orden).subscribe(res => {
        this.personas = res
      }, error => {
        this.cargarPersonas()
      })
    } else {
      this.cargarPersonas()
    }
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
    this.cargarPersonas()
  }

  reiniciar(){
    this.pagina = 1
    this.skip = 0

    this.cargarPersonas()
  }

  cargarPersonas() {
    this.personaService.obtenerPersonas(this.empresa, this.registros, this.skip, this.orden).subscribe(res => {
      this.personas = res;
    })
  }

  eliminarPersona(id) {

    var confirmacion = confirm('¿Está seguro que desea eliminar a la persona?');

    if (confirmacion) {
      this.personaService.buscarUnaPersonaId(id, this.empresa).subscribe((res: any) => {
        if (res[0]) {
          if (res[0].cliente.length > 0 || res[0].usuario.length > 0) {
            alert('No se puede eliminar la persona, existen datos relacionados');
          } else {
            this.personaService.eliminarUnaPersona(id).subscribe(res => {
              this.cargarPersonas()
            })
          }
        }
      })

    }


  }

}
