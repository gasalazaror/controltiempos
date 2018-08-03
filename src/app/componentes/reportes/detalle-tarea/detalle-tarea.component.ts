import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ReporteService } from '../../../servicios/reporte/reporte.service';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html',
  styleUrls: ['./detalle-tarea.component.css']
})
export class DetalleTareaComponent implements OnInit {

  tarea: any
  id: any
  ordenServicio: any
  pausas: any

  constructor
    (
    private localStorage: LocalStorage,
    private router: Router,
    private reporteService: ReporteService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pausas = []

    this.ordenServicio = {orden: {id: ''}, servicio: {descripcion: ''}, estado:''}
    this.tarea = {tiempoEstandar:'', operador: '', inicio: '', fin: ''}
  }

  ngOnInit() {
    this.obtenerOrdenServicio()
    this.obtenerReporteGlobal()
    this.obtenerPausas()
  }

  obtenerReporteGlobal() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.reporteService.obtenerUnReporteGlobal(usuario.persona.empresa.id, this.id).subscribe((res: any) => {
          this.tarea = res.rows[0];
          console.log(this.tarea)

        })
      }
    });
  }

  obtenerOrdenServicio() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.reporteService.obtenerUnOrdenServicio(usuario.persona.empresa.id, this.id).subscribe((res: any) => {
          this.ordenServicio = res;


        })
      }
    });
  }

  obtenerPausas() {
    this.reporteService.obtenerPausas(this.id).subscribe((res: any) => {
      console.log(res.rows)
     this.pausas = res.rows;


    })
  }



}
