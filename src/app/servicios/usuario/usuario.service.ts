import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService) { }

  activarUsuario(persona){
    return this.apiService.post('usuario', {persona: persona});
  }
}
