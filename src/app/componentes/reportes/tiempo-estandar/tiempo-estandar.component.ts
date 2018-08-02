import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { NgbModal, ModalDismissReasons } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ReporteService } from '../../../servicios/reporte/reporte.service';

@Component({
  selector: 'app-tiempo-estandar',
  templateUrl: './tiempo-estandar.component.html',
  styleUrls: ['./tiempo-estandar.component.css']
})
export class TiempoEstandarComponent implements OnInit {

  filtro: any
  personas: any
  registros: any
  pagina: any
  skip:any
  personaSeleccionada: any
  persona: any

  filtroTiempo: any

  constructor
  (
    private localStorage: LocalStorage,
    private modalService2: NgbModal,
    private personaService: PersonaService,
    private router: Router,
    private reporteService: ReporteService
  ) {
    this.registros = '10'
    this.pagina = 1
    this.skip = 0
    this.personaSeleccionada = ''

    this.filtroTiempo = {inicio: this.convertir(Date.now()), fin: this.convertir(Date.now())}
  }

  open(content) {
    this.obtenerPersonas()
    this.modalService2.open(content, { windowClass: 'dark-modal' });
  }

  seleccionarPersona(persona) {
    this.persona = persona
    this.personaSeleccionada = persona.cedula + " - " + persona.nombre    
  }

  convertirFecha(fecha){
    const date: Date = new Date(fecha);
    return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
  }

  obtenerPersonas() {

    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.personaService.obtenerPersonas(usuario.persona.empresa.id, this.registros,this.skip, 'ASC', ).subscribe((res: any) => {
          var personas = []
          res.forEach(persona => {
            if (persona.usuario.length == 1) {
              personas.push(persona)
            }
          });
          this.personas = personas
        })
      }
    });
    
   
  }

  ngOnInit() {
  }

  convertir(fecha){
    var local = new Date(fecha);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  }

  buscarPorOperador(){
    var inicio = new Date(this.filtroTiempo.inicio)
    var fin = new Date(this.filtroTiempo.inicio)

   
  }

  
}
