import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private apiService: ApiService) { }

  buscarUnaPersonaId(id, empresa) {
    return this.apiService.get('persona?empresa=' + empresa + '&id=' + id)
  }

  obtenerUnaPersonaCedula(cedula,empresa) {
    return this.apiService.get('persona?cedula='+cedula+'&empresa='+empresa)
  }

  
  guardarPersona(persona){
    return this.apiService.post('persona', persona);
  }

  modificarPersona(id,persona){
    return this.apiService.put('persona/'+id, persona);
  }

  buscarUnaPersona(termino,empresa) {
    return this.apiService.get('persona?empresa='+empresa+'&where={"or":[{"cedula": {"contains":"'+termino+'"}}, {"nombre": {"contains":"'+termino+'"}} , {"telefono": {"contains":"'+termino+'"}}, {"correo": {"contains":"'+termino+'"}}    ]}')
  }

  obtenerPersonas(empresa){
    return this.apiService.get('persona?empresa='+empresa);
  }

  modificarRoles(usuario, roles){
 
    
    return this.apiService.put('usuario/'+usuario, roles);
  }

 
}
