import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../../../servicios/servicio/servicio.service';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';


@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  servicio: any
  error: any
  categorias: any
  empresa: any
  categoriaSeleccionada: any
  id: any
  usuario:any
  arbolCategoria:any

  constructor
    (
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private router: Router,
    private localStorage: LocalStorage
    ) {

    this.id = this.route.snapshot.paramMap.get('id');

    this.servicio = {
      empresa: 1,
      codigo: '',
      descripcion: '',
      tiempoEstandar: null,
      categoria: { id: '', descripcion: '' },
    }

    this.arbolCategoria = []

    this.error = {
      descripcion: '',
      tiempoEstandar: ''
    }

    this.categorias = []

   this.buscarSesion()
    this.categoriaSeleccionada = { id: null, descripcion: '' }
  }

  buscarSesion() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.usuario = usuario
      }
    });
  }


  obtenerUnServicio() {
    if (this.id != 'nuevo') {
      this.servicioService.obtenerUnServicio(this.id).subscribe((res:any) => {
        this.servicio = res;
        this.categoriaSeleccionada = res.categoria
        this.arbolCategoria.push(res.categoria)
      })
    }
  }

  reanudar() {
    this.servicio = {
      empresa: 1,
      codigo: '',
      descripcion: '',
      tiempoEstandar: null,
      categoria: { id: this.categoriaSeleccionada.id, descripcion: this.categoriaSeleccionada.descripcion },
    }

    this.error = {
      descripcion: '',
      tiempoEstandar: ''
    }
  }

  cambiarCategoria(categoria) {
    this.servicio.categoria.id = categoria.id;
    this.servicio.categoria.descripcion = categoria.descripcion;
  }

  obtenerCategoriasPadre() {
    this.localStorage.getItem('usuario').subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['login']);
      } else {
        this.servicioService.obtenerCategorias(usuario.persona.empresa.id).subscribe((res: any) => {
          var categorias = []
          this.arbolCategoria = []
          res.forEach(element => {
            if (element.padre == null) {
           
              categorias.push(element)
            }
          });
          this.categorias = categorias;
          this.categoriaSeleccionada = { id: null, descripcion: '' }
        })
      }
    });

    
  }

  obtenerCategoriasHijas(id) {

    this.servicioService.obtenerCategoria(id).subscribe((res: any) => {
      if (res.categorias.length == 0) {

        var aux = false;
        this.arbolCategoria.forEach(element => {
          if(element.id == id){aux=true}
        });
        if(!aux){
          this.arbolCategoria.push(res);
          this.categoriaSeleccionada = res
          this.categorias=[]
        }
        this.servicio.categoria = { id: res.id, descripcion: res.descripcion };
      } else {
        this.categoriaSeleccionada.descripcion = res.descripcion
        this.categoriaSeleccionada.id = res.id
        this.categorias = res.categorias
        this.arbolCategoria.push(res)
      }
    })
  }

  obtenerCategoriasHijasMenu(id) {

    this.servicioService.obtenerCategoria(id).subscribe((res: any) => {
      if (res.categorias.length == 0) {
        this.servicio.categoria = { id: res.id, descripcion: res.descripcion };
      } else {
        this.categoriaSeleccionada.descripcion = res.descripcion
        this.categoriaSeleccionada.id = res.id
        this.categorias = res.categorias
   
      }
    })
  }

  agregarCategoria() {
    var categoria = prompt('Ingrese el nombre de la categoría', '');

    if (categoria) {
      if (categoria.trim() != '') {
        this.servicioService.buscarCategoria('descripcion', categoria, this.usuario.persona.empresa.id)
          .subscribe(res => {
            if (res[0]) {
              alert('La categoría ' + categoria.toUpperCase() + ' ya existe')
            } else {
              if (this.categoriaSeleccionada.id == null) {
                this.servicioService.guardarCategoria({ empresa: this.usuario.persona.empresa.id, descripcion: categoria.toUpperCase().trim() }).subscribe(res => {
                  this.obtenerCategoriasPadre()
                }, error => { alert('Existió un error') })
              } else {
                this.servicioService.guardarCategoria({ padre: this.categoriaSeleccionada.id, empresa: this.usuario.persona.empresa.id, descripcion: categoria.toUpperCase().trim() }).subscribe((res:any) => {
                  this.obtenerCategoriasHijas(res.id);
                }, error => { alert('Existió un error') })
  
              }
  
  
  
            }
          })
  
      }
    } else {
      
    }
 
  }

  agregarCategoriaConPadre(id) {
    var categoria = prompt('Ingrese el nombre de la categoría', '');

    if (categoria.trim() != '') {

      this.servicioService.buscarCategoria('descripcion', categoria, this.usuario.persona.empresa.id)
        .subscribe(res => {
          if (res[0]) {
            alert('La categoría ' + categoria.toUpperCase() + ' ya existe')
          } else {

            this.servicioService.guardarCategoria({ padre: id, empresa: this.usuario.persona.empresa.id, descripcion: categoria.toUpperCase().trim() }).subscribe(res => {
              this.obtenerCategoriasHijas(id);
            }, error => { alert('Existió un error') })



          }
        })

    }
  }


  validarDescripcion() {

    if (this.servicio.descripcion.trim() == '') {
      this.error.descripcion = 'La descripción del servicio es requerida'
    } else {
      this.error.descripcion = ''
      this.buscarUnServicio()
    }
  }
  validarTiempoEstandar() {



    var tiempo = ''
    tiempo = this.servicio.tiempoEstandar + ""
    if (tiempo.trim() == '') {
      this.error.tiempoEstandar = "El tiempo estandar del servicio es requerido"
    } else if (this, this.servicio.tiempoEstandar <= 0) {
      this.error.tiempoEstandar = 'El tiempo estandar no puede ser igual o menor a 0'
    } else {
      this.error.tiempoEstandar = ''
    }
  }

  guardarServicio() {
    var confirmacion = confirm("¿Está seguro que desea guardar el servicio?");

    if (confirmacion) {

      if (this.id == 'nuevo') {

        this.servicioService.guardarServicio({empresa: this.usuario.persona.empresa.id, descripcion: this.servicio.descripcion.toUpperCase().trim(), codigo: this.servicio.codigo.toUpperCase().trim(), tiempoEstandar: this.servicio.tiempoEstandar, categoria: this.servicio.categoria.id }).subscribe(res => {
          alert('Servicio guardado correctamente')
          this.reanudar();
        }, error => {
          alert('Existió un error al guardar el servicio')
        })

      } else {
        this.servicioService.modificarServicio(this.servicio.id, { descripcion: this.servicio.descripcion.toUpperCase().trim(), codigo: this.servicio.codigo.toUpperCase().trim(), tiempoEstandar: this.servicio.tiempoEstandar, categoria: this.servicio.categoria.id })
          .subscribe(res => {
            alert('Servicio modificado correctamente')
            this.servicio = res;
          }, error => {
            alert('Existió un error al modificar el servicio')
          })
      }

    }


  }


  


  buscarUnServicio() {
    this.servicioService.buscarUnServicioDescripcion(this.servicio.descripcion.trim().toUpperCase(), this.usuario.persona.empresa.id).subscribe(res => {
      if (res[0]) {
        this.error.descripcion = "El servicio ya existe en la base de datos"
      } else {
        this.error.descripcion = ""
      }
    })
  }

  ngOnInit() {

    this.obtenerCategoriasPadre();


    if (this.id != 'nuevo') {
      this.obtenerUnServicio()
      this.servicioService.obtenerUnServicio(this.id).subscribe((res:any) => {
        this.servicio = res;
        this.categoriaSeleccionada = res.categoria
        this.arbolCategoria.push(res.categoria)
      })
    }
  }

}
