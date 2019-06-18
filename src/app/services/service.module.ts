import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import {
  SidebarService,
  SharedService,
  PersonaService,
  LogingGuardGuard,
  RequisitoService,
  SubirArchivoService
} from './service.index';


@NgModule({
  declarations: [],
  providers: [
    SidebarService,
    SharedService,
    PersonaService,
    LogingGuardGuard,
    RequisitoService,
    SubirArchivoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
