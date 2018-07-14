import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/starter', title: 'Panel de control', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '', title: 'Personas', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/persona/crearpersona/nuevo', title: 'Registrar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/persona/consultarpersona', title: 'Consultar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

        ]
    }, {
        path: '', title: 'Vehículos', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
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
    }

];

