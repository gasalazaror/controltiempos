import { Routes } from '@angular/router';

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
import { CrearOrdenComponent } from '../componentes/orden/crear-orden/crear-orden.component';
import { ConsultarOrdenComponent } from '../componentes/orden/consultar-orden/consultar-orden.component';
import { InformacionOrdenComponent } from '../componentes/orden/informacion-orden/informacion-orden.component';
import { MisTareasComponent } from '../componentes/servicio/misTareas/mis-tareas/mis-tareas.component';
import { LoginComponent } from '../componentes/login/login/login.component';
import { CrearGrupoComponent } from '../componentes/grupo/crear-grupo/crear-grupo.component';
import { ConsultarGrupoComponent } from '../componentes/grupo/consultar-grupo/consultar-grupo.component';
import { InformacionGrupoComponent } from '../componentes/grupo/informacion-grupo/informacion-grupo.component';
import { TiempoEstandarComponent } from '../componentes/reportes/tiempo-estandar/tiempo-estandar.component';
import { TiempoRealComponent } from '../componentes/reportes/tiempo-real/tiempo-real.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'crearpersona/:id',
        component: CrearPersonaComponent,
        data: {
          title: 'Crear Vehículo',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Crear' }]
        }
      },
      {
        path: 'tiempoestandar',
        component: TiempoEstandarComponent,
        data: {
          title: 'Crear Vehículo',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Crear' }]
        }
      },
      {
        path: 'tiemporeal',
        component: TiempoRealComponent,
        data: {
          title: 'Crear Vehículo',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Crear' }]
        }
      },
      {
        path: 'creargrupo/:id',
        component: CrearGrupoComponent,
        data: {
          title: 'Crear Grupo',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Crear' }]
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'login',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Crear' }]
        }
      },
      {
        path: 'mistareas',
        component: MisTareasComponent,
        data: {
          title: 'Mis tareas',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Crear' }]
        }
      },
      {
        path: 'crearorden/:id',
        component: CrearOrdenComponent,
        data: {
          title: 'Crear Orden',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Crear' }]
        }
      },
      {
        path: 'crearvehiculo/:id',
        component: CrearVehiculoComponent,
        data: {
          title: 'Crear Persona',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Vehículo' }, { title: 'Crear' }]
        }
      },
      {
        path: 'crearservicio/:id',
        component: CrearServicioComponent,
        data: {
          title: 'Crear Servicio',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Servicio' }, { title: 'Crear' }]
        }
      },
      {
        path: 'consultarpersona',
        component: ConsultarPersonaComponent,
        data: {
          title: 'Consultar Persona',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Consultar' }]
        }
      },
      {
        path: 'consultargrupo',
        component: ConsultarGrupoComponent,
        data: {
          title: 'Consultar Persona',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Consultar' }]
        }
      },
      {
        path: 'consultarorden',
        component: ConsultarOrdenComponent,
        data: {
          title: 'Consultar Orden',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Consultar' }]
        }
      },
      {
        path: 'consultarvehiculo',
        component: ConsultarVehiculoComponent,
        data: {
          title: 'Consultar Vehículo',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Vehículo' }, { title: 'Consultar' }]
        }
      },
      {
        path: 'consultarservicio',
        component: ConsultarServicioComponent,
        data: {
          title: 'Consultar Servicio',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Servicio' }, { title: 'Consultar' }]
        }
      },
      {
        path: 'informacionpersona/:id',
        component: InformacionPersonaComponent,
        data: {
          title: 'Información Persona',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Información' }]
        }
      },
      {
        path: 'informaciongrupo/:id',
        component: InformacionGrupoComponent,
        data: {
          title: 'Información Grupo',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Información' }]
        }
      },
      {
        path: 'informacionorden/:id',
        component: InformacionOrdenComponent,
        data: {
          title: 'Información Orden',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Persona' }, { title: 'Información' }]
        }
      },
      {
        path: 'informacionvehiculo/:id',
        component: InformacionVehiculoComponent,
        data: {
          title: 'Información Vehículo',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Vehículo' }, { title: 'Información' }]
        }
      },

      {
        path: 'informacionservicio/:id',
        component: InformacionVehiculoComponent,
        data: {
          title: 'Información Servicio',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Servicio' }, { title: 'Información' }]
        }
      },
      {
        path: 'progressbar',
        component: NgbdpregressbarBasic,
        data: {
          title: 'Progressbar',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Progressbar' }]
        }
      },
      {
        path: 'pagination',
        component: NgbdpaginationBasic,
        data: {
          title: 'Pagination',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Pagination' }]
        }
      },
      {
        path: 'accordion',
        component: NgbdAccordionBasic,
        data: {
          title: 'Accordion',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Accordion' }]
        }
      },
      {
        path: 'alert',
        component: NgbdAlertBasic,
        data: {
          title: 'Alert',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Alert' }]
        }
      },
      {
        path: 'carousel',
        component: NgbdCarouselBasic,
        data: {
          title: 'Carousel',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Carousel' }]
        }
      },
      {
        path: 'datepicker',
        component: NgbdDatepickerBasic,
        data: {
          title: 'Datepicker',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Datepicker' }]
        }
      },
      {
        path: 'dropdown',
        component: NgbdDropdownBasic,
        data: {
          title: 'Dropdown',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Dropdown' }]
        }
      },
      {
        path: 'modal',
        component: NgbdModalBasic,
        data: {
          title: 'Modal',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Modal' }]
        }
      },
      {
        path: 'poptool',
        component: NgbdPopTooltip,
        data: {
          title: 'Popover & Tooltip',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Popover & Tooltip' }]
        }
      },
      {
        path: 'rating',
        component: NgbdratingBasic,
        data: {
          title: 'Rating',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Rating' }]
        }
      },
      {
        path: 'tabs',
        component: NgbdtabsBasic,
        data: {
          title: 'Tabs',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Tabs' }]
        }
      },
      {
        path: 'timepicker',
        component: NgbdtimepickerBasic,
        data: {
          title: 'Timepicker',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Timepicker' }]
        }
      },
      {
        path: 'typehead',
        component: NgbdtypeheadBasic,
        data: {
          title: 'Typehead',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Typehead' }]
        }
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
          title: 'Button',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Button' }]
        }
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Card',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ngComponent' }, { title: 'Card' }]
        }
      }]
  }
];
