import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { GrupoService } from '../../../servicios/grupo/grupo.service';


@Component({
  selector: 'app-consultar-grupo',
  templateUrl: './consultar-grupo.component.html',
  styleUrls: ['./consultar-grupo.component.css']
})
export class ConsultarGrupoComponent implements OnInit {

  termino: any
  grupos: any;
  empresa: any;

  registros: any
  orden: any
  pagina: any
  skip: any
  usuario:any

  constructor
  (
    private grupoService: GrupoService,
    private router: Router,
    private localStorage: LocalStorage
  ) { 
    this.termino = '';
    this.grupos = []
    this.empresa = 1;

    this.registros = '10'
    this.orden = 'ASC'
    this.pagina = 1
    this.skip = 0
  }

  ngOnInit() {
    this.buscarSesion()
  }

  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {

        this.router.navigate(['login']);
      }else{
        this.usuario = usuario
        this.cargarGrupos()
     
      }
    });
  }

  buscarGrupo() {
    this.pagina = 1
    this.skip = 0
    if (this.termino.length > 2) {
      this.grupoService.buscarGrupos(this.termino.toUpperCase(), this.usuario.persona.empresa.id, this.registros, this.skip, this.orden).subscribe(res => {
        this.grupos = res
      }, error => {
        this.cargarGrupos()
      })
    } else {
      this.cargarGrupos()
    }
  }

  navegarPaginas(accion) {
    var registros = this.grupos.length
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
    this.cargarGrupos()
  }

  reiniciar(){
    this.pagina = 1
    this.skip = 0

    this.cargarGrupos()
  }

  cargarGrupos() {
    this.grupoService.obtenerGruposConsulta(this.usuario.persona.empresa.id, this.registros, this.skip, this.orden).subscribe(res => {
      this.grupos = res;

    
    })
  }

  eliminarPersona(id) {
  /*   var confirmacion = confirm('¿Está seguro que desea eliminar a la persona?');
    if (confirmacion) {
      this.personaService.buscarUnaPersonaId(id, this.usuario.persona.empresa.id).subscribe((res: any) => {
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
    } */
  }

}
