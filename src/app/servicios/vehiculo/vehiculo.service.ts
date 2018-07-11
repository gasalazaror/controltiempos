import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private apiService: ApiService) { }

  obtenerVehiculos(empresa) {
    return this.apiService.get('vehiculo?empresa=' + empresa)
  }

  obtenerUnVehiculo(empresa, termino, valor) {
    return this.apiService.get('vehiculo?' + termino + '=' + valor + '&empresa=' + empresa)
  }
}
