import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Personal', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/starter', title: 'Starter Page', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '', title: 'UI Components', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },{
        path: '', title: 'Personas', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/persona/crearpersona/nuevo', title: 'Registrar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/persona/consultarpersona', title: 'Consultar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
        ]
    } ,{
        path: '', title: 'Vehículos', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/vehiculo/crearvehiculo/nuevo', title: 'Registrar Vehículo', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/vehiculo/consultarvehiculo', title: 'Consultar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
        ]
    }     
];

