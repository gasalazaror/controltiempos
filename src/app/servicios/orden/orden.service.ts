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

  modificarOrden(id,orden){
    return this.apiService.put('orden/'+id, orden);
  }

  modificarOrdenServicio(id,orden){
    return this.apiService.put('ordenservicio/'+id, orden);
  }

  obtenerOrdenes(empresa){
    return this.apiService.get('orden?empresa='+empresa)
  }

  obtenerUnaOrden(id){
    return this.apiService.get('orden/'+id)
  }

  obtenerServiciosOrden(id){
    return this.apiService.get('ordenservicio?orden='+id)
  }

  obtenerServiciosOrdenId(id){
    return this.apiService.get('ordenservicio/'+id)
  }
}
