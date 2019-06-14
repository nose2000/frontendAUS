import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { Persona } from '../../models/persona.model';

import { map,  catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona: Persona;
  token: string;
  // menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router
    ) {
      this.cargarStorage();
    }


  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.persona = JSON.parse( localStorage.getItem('persona'));


    } else {
      this.token = '';
      this.persona = null;
    }

  }

  // guardando informacion del token en el localStorage
  guardarStorage( id: string, token: string, persona: Persona) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('persona', JSON.stringify(persona));


    this.persona = persona;
    this.token = token;


  }


  logout() {
    this.persona = null;
    this.token = '';

    localStorage.removeItem('toke');
    localStorage.removeItem('persona');

    this.router.navigate(['/login']);
  }



  login(persona: Persona, recordar: boolean = false) {

    // recordar email
    if (recordar) {
      localStorage.setItem('email', persona.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, persona)
                .pipe(
                  map( (resp: any) => {

                    this.guardarStorage(resp.id, resp.token, resp.persona);

                    return true;
                  }));
                  // manejo del error que biene del backend
                  /* .pipe(
                    catchError (err =>
                      of([
                        console.log('HTTP Error', err.status),
                        Swal.fire('error Login', err.error.mensaje, 'error')
                      ]))
                  ); */

  }


  actualizarPersona(persona: Persona) {

    console.log(persona);

    let url = URL_SERVICIOS + '/persona/' + persona._id;
    url += '?token=' + this.token;

    //console.log( url);

    return this.http.put( url, persona);
  }







}
