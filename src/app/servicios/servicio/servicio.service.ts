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

  eliminarServicio(servicio) {
    return this.apiService.delete('servicio/'+servicio);
  }

  obtenerUnServicio(servicio){
    return this.apiService.get('servicio/'+servicio)
  }


  
  obtenerCategorias(empresa){
    return this.apiService.get('categoria?empresa='+empresa)
  }

  buscarCategoria(descripcion, valor, empresa){
    return this.apiService.get('categoria?'+descripcion+'='+valor+'&empresa='+empresa)
  }

  pausarServicio(servicio, horaInicio) {
    return this.apiService.post('pausa', { ordenServicio: servicio, horaInicio: horaInicio })
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

  modificarServicio(id,servicio) {
    return this.apiService.put('servicio/'+id, servicio)
  }

  obtenerCategoriasPadre(empresa){
    return this.apiService.get('')
  }

  obtenerServiciosGrupo(grupo, limit, skip, orden){
    return this.apiService.get('ordenservicio?grupo='+grupo+'&limit='+limit+'&skip='+skip+"&sort=createdAt "+orden)
  }

  obtenerServiciosGrupoEstado(grupo, estado, limit, skip, orden){
    return this.apiService.get('ordenservicio?grupo='+grupo+"&estado="+estado+'&limit='+limit+'&skip='+skip +"&sort=createdAt "+orden)
  }

  reanudarServicio(pausa, horaFin) {
    alert
    return this.apiService.put('pausa/' + pausa, { horaFin: horaFin })
  }

  iniciarServicio(servicio, horaInicio) {
    return this.apiService.put('ordenservicio/' + servicio, { horaInicio: horaInicio, estado: 'EN PRODUCCIÓN' });
  }

  finalizarServicio(servicio, horaFin) {
    return this.apiService.put('ordenservicio/' + servicio, { horaFin: horaFin, estado: 'POR FACTURAR' });
  }

  modificarEstado(ordenServicio, estado, pausaActual) {
    return this.apiService.put('ordenServicio/' + ordenServicio, { estado: estado, pausaActual: pausaActual })
  }
}
