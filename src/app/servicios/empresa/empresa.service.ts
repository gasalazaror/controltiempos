import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private apiService: ApiService) { }

  crearEmpresa(empresa){
    return this.apiService.post('empresa', empresa)
  }

  obtenerUnaEmpresa(empresa){
    return this.apiService.get('empresa/'+empresa)
  }
}
