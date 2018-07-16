import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private apiService: ApiService) { }

  guardarOrden(orden){
    return this.apiService.post('orden', orden);
  }
}
