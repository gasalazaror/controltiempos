import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private api: ApiService) { }

  obtenerServiciosUsuario(operadores, limit, skip, orden){
    var url = 'ordenservicio?where={"or":'+operadores+'}&limit='+limit+'&skip='+skip+'&sort=createdAt '+orden
    return this.api.get(url)
  }
}
