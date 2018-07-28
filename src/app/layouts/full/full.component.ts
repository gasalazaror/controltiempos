import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { THIS_EXPR } from '../../../../node_modules/@angular/compiler/src/output/output_ast';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';

@Component({
    selector: 'full-layout',
    templateUrl: './full.component.html',
    styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

    color = 'defaultdark';
    showSettings = false;
    showMinisidebar = false;
    showDarktheme = false;
    showMenu = true

    public config: PerfectScrollbarConfigInterface = {};

    constructor(public router: Router, private localStorage: LocalStorage) {

    }

    ngOnInit() {

        if (this.router.url === '/') {
            this.router.navigate(['/dashboard/dashboard1']);
        }

        this.buscarSesion()
    }

    buscarSesion() {
        this.localStorage.getItem('usuario').subscribe((usuario) => {
            if (!usuario) {
              
                this.router.navigate(['login']);
            } 
        });
    }


}
