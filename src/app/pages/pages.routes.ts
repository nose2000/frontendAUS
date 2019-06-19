import {RouterModule, Routes} from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogingGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

import { RequisitoComponent } from './requisitos/requisito.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { PersonasComponent } from './personas/personas.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LogingGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },

            //mantenimientos
            {path: 'requisitos', component: RequisitosComponent, data: {titulo: 'Mantenimiento de requisitos'} },

            {path: 'personas', component: PersonasComponent, data: {titulo: 'Mantenimiento de usuarios'} },

            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            {path: 'requisito/:id', component: RequisitoComponent, data: {titulo: 'Requisitos'} },
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);