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
        path: '', title: 'Persona', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/persona/crearpersona/nuevo', title: 'Crear Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/persona/consultarpersona', title: 'Consultar Persona', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        
        ]
    }     
];

