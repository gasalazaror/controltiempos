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
  skip: any
  personaSeleccionada: any
  persona: any
  filtroTiempo: any
  reportes: any;
  sumas: any
  operadores: any
  operadoresSeleccionados: any

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
    this.sumas = []
    this.operadores = []
    this.operadoresSeleccionados = []

    this.personaSeleccionada = ''

    this.filtroTiempo = { inicio: this.convertir(Date.now()), iniciohora: '00:00', fin: this.convertir(Date.now()), finhora: '23:59' }

    this.obtenerReporteGlobal()
    this.obtenerSumatoriaGlobal()
    this.obtenerOperadores()
  }

  open(content) {
    this.obtenerPersonas()
    this.modalService2.open(content, { windowClass: 'dark-modal' });
  }

  seleccionarPersona(persona) {
    this.persona = persona
    this.personaSeleccionada = persona.descripcion
  }

  convertirFecha(fecha) {
    const date: Date = new Date(fecha);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
  }

  obtenerPersonas() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.personaService.obtenerPersonas(usuario.persona.empresa.id, this.registros, this.skip, 'ASC', ).subscribe((res: any) => {
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

  obtenerReporteGlobal() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.reporteService.obtenerReporteGlobal(usuario.persona.empresa.id).subscribe((res: any) => {
          this.reportes = res.rows;

        })
      }
    });
  }

  obtenerOperadores() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.reporteService.obtenerOperadores(usuario.persona.empresa.id).subscribe((res: any) => {
          this.operadores = res

        })
      }
    });
  }

  obtenerSumatoriaGlobal() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.reporteService.obtenerSumatoriasGlobal(usuario.persona.empresa.id).subscribe((res: any) => {
          this.sumas = res.rows;

        })
      }
    });
  }

  ngOnInit() {
  }

  convertir(fecha) {
    var local = new Date(fecha);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  buscarPorOperador() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        var sql = "SELECT * FROM vista_reporte WHERE inicio >= '" + this.convertirFechaSql(this.filtroTiempo.inicio) + " " + this.filtroTiempo.iniciohora + "' AND inicio <= '" + this.convertirFechaSql(this.filtroTiempo.fin) + " " + this.filtroTiempo.finhora + "' and fin >= '" + this.convertirFechaSql(this.filtroTiempo.inicio) + " " + this.filtroTiempo.iniciohora + "' AND fin <= '" + this.convertirFechaSql(this.filtroTiempo.fin) + " " + this.filtroTiempo.finhora + "' AND operador = '" + this.persona.descripcion + "' AND empresa = " + usuario.persona.empresa.id
        this.reporteService.obtenerReporteSql(sql).subscribe((res: any) => {
          console.log(sql)
          this.reportes = res.rows
        }, error => {
          alert(JSON.stringify(error))
        })
      }
    });
  }

  convertirFechaSql(fecha) {
    var MyDate = new Date(fecha);
    var MyDateString;


    

    MyDateString = ('0' + MyDate.getDate()).slice(-2) + '-'
      + ('0' + (MyDate.getMonth())).slice(-2) + '-'
      + MyDate.getFullYear();

    return MyDateString
  }



}
