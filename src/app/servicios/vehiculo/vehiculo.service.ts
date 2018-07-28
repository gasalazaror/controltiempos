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

  obtenerVehiculoId(vehiculo) {
    return this.apiService.get('vehiculo/' + vehiculo)
  }

  obtenerUnVehiculo(empresa, termino, valor) {
    return this.apiService.get('vehiculo?' + termino + '=' + valor + '&empresa=' + empresa)
  }

  guardarVehiculo(vehiculo) {
    return this.apiService.post('vehiculo', vehiculo)
  }

  buscarUnVehiculo(termino, empresa) {
    return this.apiService.get('vehiculo?where={"and":[{"empresa":"'+empresa+'"}],"or":[{"placa": {"contains":"'+termino+'"}}, {"modelo": {"contains":"'+termino+'"}} , {"marca": {"contains":"'+termino+'"}}, {"anioFabricacion": {"contains":"'+termino+'"}}, {"numeroChasis": {"contains":"'+termino+'"}}, {"numeroMotor": {"contains":"'+termino+'"}}    ]}')
  }

  modificarVehiculo(id,vehiculo){
    return this.apiService.put('vehiculo/'+id, vehiculo);
  }

  cambiarEsDueno(vehiculo, valor) {
    return this.apiService.put('vehiculo/' + vehiculo, valor)
  }

  eliminarVehiculo(vehiculo){
    return this.apiService.delete('vehiculo/'+vehiculo)
  }

  
}
