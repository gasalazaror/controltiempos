import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/starter', title: 'Panel de control', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '', title: 'Personas', icon: 'mdi mdi-account', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/persona/crearpersona/nuevo', title: 'Registrar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/persona/consultarpersona', title: 'Consultar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

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
            { path: '/servicio/mistareas', title: 'Mis tareas', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

        ]
    },
    {
        path: '', title: 'Ordenes', icon: 'mdi mdi-file-document', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/orden/crearorden/nuevo', title: 'Registrar Orden', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/orden/consultarorden', title: 'Consultar Orden', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

        ]
    }

];

