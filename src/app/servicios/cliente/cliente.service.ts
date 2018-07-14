import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private apiService: ApiService) { }

  activarCliente(persona){
    return this.apiService.post('cliente', {persona: persona});
  }

  

  obtenerCliente(cliente){
    return this.apiService.get('cliente/'+cliente);
  }

  modificarVehiculos(usuario, vehiculos){
    return this.apiService.put('cliente/'+usuario, vehiculos);
  }
}
