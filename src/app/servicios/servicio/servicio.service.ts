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

  buscarUnServicio(termino, empresa) {
    return this.apiService.get('servicio?empresa='+empresa+'&where={"or":[{"descripcion": {"contains":"' + termino + '"}}, {"tiempoEstandar": {"contains":"' + termino + '"}}]}')
  }

  obtenerServicios(empresa) {
    return this.apiService.get('servicio?empresa='+empresa);
  }


  
  obtenerCategorias(empresa){
    return this.apiService.get('categoria?empresa='+empresa)
  }

  buscarCategoria(descripcion, valor, empresa){
    return this.apiService.get('categoria?'+descripcion+'='+valor+'&empresa='+empresa)
  }

  obtenerCategoria(id){
    return this.apiService.get('categoria/'+id)
  }

  guardarCategoria(categoria){
    return this.apiService.post('categoria', categoria)
  }

  buscarUnServicioDescripcion(descripcion, empresa){
    return this.apiService.get('servicio?descripcion='+descripcion+"&empresa="+empresa)
  }

  guardarServicio(servicio) {
    return this.apiService.post('servicio', servicio)
  }

  obtenerCategoriasPadre(empresa){
    return this.apiService.get('')
  }
}
