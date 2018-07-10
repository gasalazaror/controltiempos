import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  constructor(private apiService: ApiService) { }

  obtenerVehiculos(empresa){

   return this.apiService.get('?servicio')
  }
}
