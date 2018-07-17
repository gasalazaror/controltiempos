import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService) { }

  activarUsuario(persona) {
    return this.apiService.post('usuario', { persona: persona });
  }

  obtenerUnUsuario(id){
    return this.apiService.get('usuario/'+id)
  }

  obtenerRolesUsuario(usuario) {
    return this.apiService.get('usuario/' + usuario + '/roles')
  }

  modificarUsuario(id, usuario) {
    return this.apiService.put('usuario/'+id, usuario )
  }

 
}
