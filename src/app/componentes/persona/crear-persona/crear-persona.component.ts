import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../servicios/persona/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { THIS_EXPR } from '../../../../../node_modules/@angular/compiler/src/output/output_ast';
import { ClienteService } from '../../../servicios/cliente/cliente.service';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  personaForm = this.fb.group({
    empresa: ['', Validators.required],
    estado: ['ACTIVO', Validators.required],
    tipo: ['NATURAL', Validators.required],
    cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    esCliente: [false],
    esEmpleado: [false],
  })

  esCliente: any
  esEmpleado: any

  persona: any;
  error: any;
  id: any;
  usuario: any;
  constructor
    (
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorage,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.persona = {
      empresa: '',
      estado: 'ACTIVO',
      ruc: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      correo: ''
    }

    this.error = ''
    this.buscarSesion()
  }

  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.usuario = usuario
        this.personaForm = this.fb.group({
          empresa: [this.usuario.persona.empresa.id,],
          estado: ['ACTIVO', [Validators.required]],
          tipo: ['NATURAL', [Validators.required]],
          cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
          nombre: ['', [Validators.required]],
          direccion: ['', [Validators.required]],
          telefono: ['', [Validators.required]],
          correo: ['', [Validators.required, Validators.email]],
          esCliente: [false],
          esEmpleado: [false],
        })
      }
    });
  }

  reanudar() {
    this.persona = {
      empresa: this.usuario.persona.empresa.id,
      estado: 'ACTIVO',
      ruc: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      correo: ''
    }

    this.error = ''

  

  }

  ngOnInit() {
    if (this.id == 'nuevo') {
    } else {
      this.buscarUnaPersonaId()
    }
  }

  buscarUnaPersonaId() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.personaService.buscarUnaPersonaId(
          this.id,
          usuario.persona.empresa.id).subscribe(res => {
            if (res[0]) {
              this.persona = res[0]

              this.personaForm = this.fb.group({
                empresa: [this.persona.empresa,Validators.required],
                estado: [this.persona.estado, [Validators.required]],
                tipo: [this.persona.tipo, [Validators.required]],
                cedula: [this.persona.cedula, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
                nombre: [this.persona.nombre, [Validators.required]],
                direccion: [this.persona.direccion, [Validators.required]],
                telefono: [this.persona.telefono, [Validators.required]],
                correo: [this.persona.correo, [Validators.required, Validators.email]],
                esCliente: [false],
                esEmpleado: [false],
              })


            }
          })
      }
    });
  }

  buscarUnapersonaCedula() {
    this.personaService.obtenerUnaPersonaCedula
      (
      this.persona.cedula,
      this.usuario.persona.empresa.id
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
    this.persona.empresa = this.usuario.persona.empresa.id
    if (this.id == 'nuevo') {
      var confirmacion = confirm("¿Está seguro que desea guardar a la persona?");
      if (confirmacion) {
        this.personaService.guardarPersona(this.personaForm.value).subscribe((res:any) => {
     
          this.persona = res
          this.reanudar();
      
          if (this.personaForm.value.esEmpleado) {
            this.usuarioService.activarUsuario({id: res.id, password: this.personaForm.value.cedula}).subscribe(res=>{

            }, error=>{
              console.log(error)
            })
          } 

          if (this.personaForm.value.esCliente) {
           

            this.clienteService.activarCliente(res.id).subscribe(res=>{

            })
          } 



          alert('Persona guardada correctamente correctamente');
          this.buscarSesion()
        }, error => {
          alert('Existió un error')
        })
      }
    } else {
      var confirmacion = confirm("¿Está seguro que desea modificar la persona?");
      if (confirmacion) {
        this.personaService.modificarPersona(
          this.persona.id,
          { nombre: this.personaForm.value.nombre, estado: this.personaForm.value.estado, telefono: this.personaForm.value.telefono, direccion: this.personaForm.value.direccion, correo: this.personaForm.value.correo, cedula: this.personaForm.value.cedula, tipo: this.personaForm.value.tipo }
        ).subscribe(res => {
          this.persona = res
          this.reanudar()
          alert('Persona modificada correctamente');
        }, error => {
          alert('Existió un error' + JSON.stringify(error))
        })
      }else{
       
      }
    }
  }

}
