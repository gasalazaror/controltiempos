import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { EmptyComponent } from './layouts/empty/empty/empty.component';
import { RegistroComponent } from './layouts/registro/registro.component';


export const Approutes: Routes = [
{
    path: '',
    component: FullComponent,
    children: [
        { path: '', redirectTo: '/starter', pathMatch: 'full' },
        { path: 'starter', loadChildren: './starter/starter.module#StarterModule' },
        { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
        { path: 'persona', loadChildren: './component/component.module#ComponentsModule' },
        { path: 'vehiculo', loadChildren: './component/component.module#ComponentsModule' },
        { path: 'servicio', loadChildren: './component/component.module#ComponentsModule' },
        { path: 'orden', loadChildren: './component/component.module#ComponentsModule' },
        { path: 'tarea', loadChildren: './component/component.module#ComponentsModule' },
    ]
    
},

{
    path: 'login',
    component: EmptyComponent,
    children: [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', loadChildren: './starter/starter.module#StarterModule' },
    ]
    
},
{
    path: 'registro',
    component: RegistroComponent,
    children: [
        { path: '', redirectTo: '/registro', pathMatch: 'full' },
        { path: 'registro', loadChildren: './starter/starter.module#StarterModule' },
    ]
    
},

{
    path: '**',
    redirectTo: '/starter' 
}];


