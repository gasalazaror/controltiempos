import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {
	
    usuario:any
    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: any[];
    //this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
            
        } else {
            this.showMenu = element; 
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
            
        } else {
            this.showSubMenu = element; 
        }
    }
    
    constructor(private modalService: NgbModal, private router: Router,
        private route: ActivatedRoute, private localStorage: LocalStorage) {
        
    } 

    buscarSesion() {
        this.localStorage.getItem('usuario').subscribe((usuario) => {
          if (usuario) {
    
            this.router.navigate(['/']);
          }
        });
      }
    // End open close
    ngOnInit() {
        this.sidebarnavItems = [

            {
                path: '/starter', title: 'Panel de control', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
            },
            {
                path: '', title: 'Personas', icon: 'mdi mdi-account', class: 'has-arrow', label: '', labelClass: '', extralink: false,
                submenu: [
                    { path: '/persona/crearpersona/nuevo', title: 'Registrar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
                    { path: '/persona/consultarpersona', title: 'Consultar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
                    { path: '', title: 'Operadores', icon: '', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
                        { path: '/persona/creargrupo/nuevo', title: 'Registrar operador', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
                        { path: '/persona/consultargrupo', title: 'Consultar operador', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },  
                    ] },
        
                ]
            }, {
                path: '', title: 'Vehículos', icon: 'mdi mdi-car', class: 'has-arrow', label: '', labelClass: '', extralink: false,
                submenu: [
                    { path: '/vehiculo/crearvehiculo/nuevo', title: 'Registrar Vehículo', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
                    { path: '/vehiculo/consultarvehiculo', title: 'Consultar Vehículo', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
                ]
            },
            {
                path: '', title: 'Servicios', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
                submenu: [
                    { path: '/servicio/crearservicio/nuevo', title: 'Registrar Servicio', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
                    { path: '/servicio/consultarservicio', title: 'Consultar Servicio', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
                ]
            },
           
        
            {
                path: '', title: 'Ordenes', icon: 'mdi mdi-file-document', class: 'has-arrow', label: '', labelClass: '', extralink: false,
                submenu: [
                    { path: '/orden/crearorden/nuevo', title: 'Registrar Orden', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
                    { path: '/orden/consultarorden', title: 'Consultar Orden', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
                ]
            },
        
            {
                path: '', title: 'Operaciones', icon: 'mdi mdi-format-list-numbers', class: 'has-arrow', label: '', labelClass: '', extralink: false,
                submenu: [
                    { path: '/servicio/mistareas', title: 'Mis operaciones', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
                ]
            },
        
            {
                path: '', title: 'Reportes', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
                submenu: [
                    { path: '/reporte/tiempoestandar', title: 'Reporte tiempo estandar', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
                    { path: '/reporte/tiemporeal', title: 'Reporte tiempo real', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
                ]
            },
        
        ];
        $(function () {
            $(".sidebartoggler").on('click', function() {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");
                     
                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });

        });
        
    }
}
