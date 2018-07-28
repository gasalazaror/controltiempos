import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private apiService: ApiService) { }

  obtenerGrupos(empresa) {
    return this.apiService.get('grupo?empresa=' + empresa)
  }

  obtenerUnGrupo(grupo, empresa){
    return this.apiService.get('grupo?id='+grupo+"&empresa="+empresa)
  }

  obtenerUnGrupoNombre(empresa, descripcion) {
    return this.apiService.get('grupo?empresa=' + empresa + "&descripcion=" + descripcion)
  }

  guardarGrupo(grupo){
    return this.apiService.post('grupo', grupo);
  }

  modificarGrupo(id,grupo){
    return this.apiService.put('grupo/'+id, grupo)
  }

  buscarGrupos(termino, empresa,limit, skip,orden) {
    return this.apiService.get('grupo?where={"and":[{"empresa":"'+empresa+'"}],"or":[{"descripcion":{"contains":"' + termino + '"}}]}'+'&limit='+limit+'&skip='+skip +"&sort=descripcion "+orden)
  }

  obtenerGruposConsulta(empresa,limit, skip,orden) {
    return this.apiService.get('grupo?empresa=' + empresa+'&limit='+limit+'&skip='+skip +"&sort=descripcion "+orden);
  }



}
