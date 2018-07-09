import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private apiService: ApiService) { }

  obtenerRoles(){
    return this.apiService.get('rol');
  }
}
