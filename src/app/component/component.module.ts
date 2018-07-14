import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/Http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { NgbdpregressbarBasic } from './progressbar/progressbar.component';
import { NgbdpaginationBasic } from './pagination/pagination.component';
import { NgbdAccordionBasic } from './accordion/accordion.component';
import { NgbdAlertBasic } from './alert/alert.component';
import { NgbdCarouselBasic } from './carousel/carousel.component';
import { NgbdDatepickerBasic } from './datepicker/datepicker.component';
import { NgbdDropdownBasic } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasic } from './modal/modal.component';
import { NgbdPopTooltip } from './popover-tooltip/popover-tooltip.component';
import { NgbdratingBasic } from './rating/rating.component';
import { NgbdtabsBasic } from './tabs/tabs.component';
import { NgbdtimepickerBasic } from './timepicker/timepicker.component';
import { NgbdtypeheadBasic } from './typehead/typehead.component';
import { CardsComponent } from './card/card.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { CrearPersonaComponent } from '../componentes/persona/crear-persona/crear-persona.component';
import { ConsultarPersonaComponent } from '../componentes/persona/consultar-persona/consultar-persona.component';
import { InformacionPersonaComponent } from '../componentes/persona/informacion-persona/informacion-persona.component';
import { CrearVehiculoComponent } from '../componentes/vehiculo/crear-vehiculo/crear-vehiculo.component';
import { ConsultarVehiculoComponent } from '../componentes/vehiculo/consultar-vehiculo/consultar-vehiculo.component';
import { InformacionVehiculoComponent } from '../componentes/vehiculo/informacion-vehiculo/informacion-vehiculo.component';
import { CrearServicioComponent } from '../componentes/servicio/crear-servicio/crear-servicio.component';
import { ConsultarServicioComponent } from '../componentes/servicio/consultar-servicio/consultar-servicio.component';
import { InformacionServicioComponent } from '../componentes/servicio/informacion-servicio/informacion-servicio.component';
import { CrearOrdenComponent } from '../componentes/orden/crear-orden/crear-orden.component';
import { ConsultarOrdenComponent } from '../componentes/orden/consultar-orden/consultar-orden.component';
import { InformacionOrdenComponent } from '../componentes/orden/informacion-orden/informacion-orden.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,

  ],
  declarations: [
    NgbdpregressbarBasic,
    NgbdpaginationBasic,
    NgbdAccordionBasic,
    NgbdAlertBasic,
    NgbdCarouselBasic,
    NgbdDatepickerBasic,
    NgbdDropdownBasic,
    NgbdModalBasic,
    NgbdPopTooltip,
    NgbdratingBasic,
    NgbdtabsBasic,
    NgbdtimepickerBasic,
    NgbdtypeheadBasic,
    CardsComponent,
    ButtonsComponent,
    CrearPersonaComponent,
    ConsultarPersonaComponent,
    InformacionPersonaComponent,
    CrearVehiculoComponent,
    ConsultarVehiculoComponent,
    InformacionVehiculoComponent,
    CrearServicioComponent,
    ConsultarServicioComponent,
    InformacionServicioComponent,
    CrearOrdenComponent,
    ConsultarOrdenComponent,
    InformacionOrdenComponent
  ]
})

export class ComponentsModule {}