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

  eliminarUnaPersona(id) {
    return this.apiService.delete('persona/' + id);
  }

  obtenerUnaPersonaCedula(cedula, empresa) {
    return this.apiService.get('persona?cedula=' + cedula + '&empresa=' + empresa)
  }

  obtenerUnCliente(cedula,empresa) {
    return this.apiService.get('persona?cedula='+cedula+'&empresa='+empresa)
  }

  guardarPersona(persona) {
    return this.apiService.post('persona', persona);
  }

  modificarPersona(id, persona) {
    return this.apiService.put('persona/' + id, persona);
  }

 

  buscarUnaPersonaSeleccionar(termino, empresa) {
    return this.apiService.get('persona?empresa=' + empresa + '&where={"or":[{"cedula": {"contains":"' + termino + '"}}, {"nombre": {"contains":"' + termino + '"}}     ]}')
  }

  buscarUnaPersonaFiltro(termino,valor, empresa) {
    return this.apiService.get('persona?empresa=' + empresa + '&'+termino+"="+valor)
  }


  obtenerPersonas(empresa,limit, skip,orden) {
    return this.apiService.get('persona?empresa=' + empresa+'&limit='+limit+'&skip='+skip +"&sort=nombre "+orden);
  }

  buscarUnaPersona(termino, empresa,limit, skip,orden) {
    return this.apiService.get('persona?empresa=' + empresa + '&where={"or":[{"cedula": {"contains":"' + termino + '"}}, {"nombre": {"contains":"' + termino + '"}} , {"telefono": {"contains":"' + termino + '"}}, {"correo": {"contains":"' + termino + '"}}    ]}'+'&limit='+limit+'&skip='+skip +"&sort=nombre "+orden)
  }

  modificarRoles(usuario, roles) {


    return this.apiService.put('usuario/' + usuario, roles);
  }


}
