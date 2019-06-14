import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';


//pipe module
import { PipesModule } from '../pipes/pipes.module';


import { ProfileComponent } from './profile/profile.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { RequisitoComponent } from './requisitos/requisito.component';




@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProfileComponent,
        RequisitosComponent,
        RequisitoComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        CommonModule
    ]
})

export class PagesModule { }