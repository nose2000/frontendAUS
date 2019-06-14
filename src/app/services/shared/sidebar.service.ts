import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'}
      ]
    } ,
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Personas', url: '/personas'},
        {titulo: 'Procesos', url: '/procesos'},
        {titulo: 'Modalidades', url: '/modalidades'},
        {titulo: 'Carreras', url: '/carreras'},
        {titulo: 'Requisitos', url: '/requisitos'},
      ]
    }
  ];

  constructor() { }
}
