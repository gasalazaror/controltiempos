import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarioLoquedo: any;

  constructor(private apiService: ApiService) { }

  activarUsuario(persona) {
    
    return this.apiService.post('usuario', { persona: persona.id, password: persona.password });
  }
    

  obtenerUsuarios(empresa){
    return this.apiService.get('persona?empresa='+empresa)
  }

  obtenerSesion(){
    return this.apiService.get('obtenerSesion');
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

  login(usuario){
    return this.apiService.post('login', usuario);
  }

  buscarEmpresa(empresa){
    return this.apiService.get('empresa/'+empresa)
  }

  guardarUsuarioLogueado(usuario){
    this.usuarioLoquedo = usuario
  }

 
 
}
