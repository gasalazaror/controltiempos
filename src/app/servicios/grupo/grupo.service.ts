import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private apiService: ApiService) { }

  obtenerGrupos(empresa){
    return this.apiService.get('grupo?empresa='+empresa)
  }
}
