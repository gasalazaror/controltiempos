import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  persona: any;
  error: any;
  id: any;

  constructor
    (
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.id = this.route.snapshot.paramMap.get('id');


    this.persona = {
      empresa: 1,
      estado: 'ACTIVO',
      ruc: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      correo: ''
    }

    this.error = {
      ruc: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      correo: ''
    }
  }

  reanudar() {
    this.persona = {
      empresa: 1,
      estado: 'ACTIVO',
      ruc: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      correo: ''
    }

    this.error = {
      ruc: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      correo: ''
    }

  }

  ngOnInit() {
    if (this.id == 'nuevo') {

    } else {
      this.buscarUnaPersonaId();
    }
  }

  buscarUnaPersonaId() {

    this.personaService.buscarUnaPersonaId(
      this.id,
      this.persona.empresa).subscribe(res => {

        if (res[0]) {

          this.persona = res[0]
        }
      })
  }

  buscarUnapersonaCedula() {
    this.personaService.obtenerUnaPersonaCedula
      (
      this.persona.cedula,
      this.persona.empresa
      ).subscribe(res => {
        if (res[0]) {


          this.error.cedula = "La persona con la cédula o RUC ingresado ya existe en la base de datos"
        } else {
          this.error.cedula = ""
        }
      })
  }

  validarNombre() {
    if (this.persona.nombre.trim() == '') {
      this.error.nombre = 'El nombre o razón social es requerido'
    } else {
      this.error.nombre = ''
    }
  }

  validarDireccion() {
    if (this.persona.direccion.trim() == '') {
      this.error.direccion = 'la dirección es requerida'
    } else {
      this.error.direccion = ''
    }
  }

  validarTelefono() {
    if (this.persona.telefono.trim() == '') {
      this.error.telefono = 'El teléfono es requerido'
    } else {
      this.error.telefono = ''
    }
  }

  validarCedula() {
    var cad = this.persona.cedula;
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;


    if (longitud === 10 || longitud === 13) {

      if (longitud === 10) {
        for (let i = 0; i < longcheck; i++) {

          if (i % 2 === 0) {
            var aux = cad.charAt(i) * 2;
            if (aux > 9) aux -= 9;
            total += aux;
          } else {
            total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
          }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {

          this.error.cedula = ("");
          this.buscarUnapersonaCedula()
        } else {

          this.error.cedula = ("Formato de la cédula incorrecta");
        }
      }

      if (longitud === 13) {

        if (cad.substring(10, 13) != "001") {
          this.error.cedula = ("Los tres últimos dígitos no tienen el código del RUC 001");
        } else {
          this.error.cedula = ''
          this.buscarUnapersonaCedula()
        }
      }


    } else {
      this.error.cedula = 'Ingrese 10 digitos para cédula y 13 para RUC'
    }
  }

  validarEmail() {

    var email = this.persona.correo;

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email)) {

      this.error.correo = "";
    } else {

      this.error.correo = "Formato del correo incorrecto";
    }
  }




  guardarPersona() {

    if (this.id == 'nuevo') {
      var confirmacion = confirm("¿Está seguro que desea guardar a la persona?");
      if (confirmacion) {
        this.personaService.guardarPersona(this.persona).subscribe(res => {
          this.persona = res
          this.router.navigate(['/persona/informacionpersona/' + this.persona.id]);
          alert('persona guardada correctamente correctamente');
        }, error => {
          alert('Existió un error')
        })
      }
    } else {
      var confirmacion = confirm("¿Está seguro que desea modificar la persona?");
      if (confirmacion) {
        this.personaService.modificarPersona(
          this.persona.id,
          { nombre: this.persona.nombre, estado: this.persona.estado, telefono: this.persona.telefono, direccion: this.persona.direccion, correo: this.persona.correo }
        ).subscribe(res => {
          this.persona = res

          this.router.navigate(['/persona/informacionpersona/' + this.persona.id]);
          alert('Persona modificada correctamente');

        }, error => {
          alert('Existió un error' + JSON.stringify(error))
        })
      }
    }


  }

}
