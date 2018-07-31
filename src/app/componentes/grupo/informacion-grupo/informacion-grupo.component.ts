import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { GrupoService } from '../../../servicios/grupo/grupo.service';
import { PersonaService } from '../../../servicios/persona/persona.service';

@Component({
  selector: 'app-informacion-grupo',
  templateUrl: './informacion-grupo.component.html',
  styleUrls: ['./informacion-grupo.component.css']
})
export class InformacionGrupoComponent implements OnInit {

  usuariosSeleccionados:any
  usuarios:any
  id:any
  operador:any

  constructor
  (

    public router: Router,
    private localStorage: LocalStorage,
    private grupoService: GrupoService,
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private route: ActivatedRoute,
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.operador = {descripcion:''}
  }

  ngOnInit() {
    this.buscarUnGrupoId()
  }

  buscarUnGrupoId() {
    this.localStorage.getItem('usuario').subscribe((usuarioLogin) => {
      if (!usuarioLogin) {
        this.router.navigate(['login']);
      } else {
        this.usuariosSeleccionados = []
        this.usuarioService.obtenerUsuarios(usuarioLogin.persona.empresa.id).subscribe(res => {
          this.usuarios = res
          this.grupoService.obtenerUnGrupo(
            this.id,
            usuarioLogin.persona.empresa.id).subscribe((res: any) => {
              if (res[0]) {
                this.operador = {descripcion: res[0].descripcion}

                res[0].usuarios.forEach(usuario => {
                  this.personaService.buscarUnaPersonaId(usuario.id, usuarioLogin.persona.empresa.id).subscribe((resultado: any) => {
                    this.usuarios.forEach(usuario => {
                      usuario.esSeleccionado = false
                      if (usuario.id == resultado[0].id) {
                        this.usuariosSeleccionados.push(resultado[0])
                        //usuario.esSeleccionado = true
                      } else {
                      }
                    });
                  })
                });
            
              }
         

            })
        })


      }
    });
  }

}
