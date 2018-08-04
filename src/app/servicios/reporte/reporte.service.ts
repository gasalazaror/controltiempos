import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private api: ApiService) { }

  obtenerReporteGlobal(empresa) {
    var sql = "SELECT * FROM vista_reporte where empresa='" + empresa + "' AND estado='POR FACTURAR'";
    return this.api.post('reporte', { sql: sql });
  }

  
  obtenerUnReporteGlobal(empresa, ordenservicio) {
    var sql = "SELECT * FROM vista_reporte where empresa='" + empresa + "' AND ordenservicio='"+ordenservicio+"'";
    return this.api.post('reporte', { sql: sql });
  }

  obtenerReporteSql(sql){
    return this.api.post('reporte', { sql: sql });
  }

  obtenerSumatoriasGlobal(empresa) {
    var sql = "SELECT TIME_FORMAT(SEC_TO_TIME(SUM(tiempoEstandarSec)),'%H:%i:%s') as sumaTiempoEstandar, TIME_FORMAT(SEC_TO_TIME(SUM(tiempoRealSec)),'%H:%i:%s') as sumaTiempoReal, FORMAT(((SUM(tiempoEstandarSec)/SUM(tiempoRealSec))*100),0) as eficiencia FROM vista_reporte where empresa='"+empresa+"'"
    return this.api.post('reporte', { sql: sql });
  }

  obtenerUnOrdenServicio(empresa, id){
    return this.api.get('ordenservicio/'+id);
  }

  obtenerPausas(ordenServicio){
    var sql = "SELECT * from vista_pausas where ordenservicio = '"+ordenServicio+"'"
    return this.api.post('reporte', {sql:sql})
  }

  obtenerOperadores(empresa){
    return this.api.get('operador?empresa='+empresa)
  }
}
