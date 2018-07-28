import { Component, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { Router } from './../../../../node_modules/@angular/router';

declare var $: any;
@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
    name:string;
    usuario:any
  	constructor(private modalService: NgbModal, private localStorage: LocalStorage, public router: Router) {
        
        this.usuario = {
            persona: {nombre: '', correo:''}
        }
        
        this.buscarSesion()
    }

    buscarSesion() {
        this.localStorage.getItem('usuario').subscribe((usuario) => {
            if (!usuario) {
                this.router.navigate(['login']);
            } 

            this.usuario = usuario
        });
    }

    cerrarSesion(){
        this.localStorage.removeItem('usuario').subscribe(() => {});
        this.router.navigate(['login']);
    }
      
    ngAfterViewInit() {
        
        var set = function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("#main-wrapper").addClass("mini-sidebar");
            } else {
                $("#main-wrapper").removeClass("mini-sidebar");
            }
        };
        $(window).ready(set);
        $(window).on("resize", set);

        
        $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
            $(".app-search").toggle(200);
        });
        
        
        $("body").trigger("resize");
    }
}
