import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { Persona } from '../../models/persona.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

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
    public router: Router,
    public _subirArchivoService: SubirArchivoService
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

    let url = URL_SERVICIOS + '/persona/' + persona._id;
    url += '?token=' + this.token;

    return this.http.put( url, persona)
            .pipe(
              map( ( resp: any) => {

                if ( persona._id === this.persona._id) {

                  let personaDB: Persona = resp.persona;

                  this.guardarStorage( personaDB._id, this.token, personaDB);

                }

                Swal.fire('Usuario actualizado', persona.nombrePer, 'success');

                return true;
              }));
  }


  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo( archivo, 'personas', id )
          .then( (resp: any) => {

            this.persona.img = resp.persona.img;
            Swal.fire( 'Imagen Actulaizada', this.persona.nombrePer, 'success');

            this.guardarStorage( id, this.token, this.persona);
          })
          .catch( resp => {
            console.log(resp);
          });

  }

  cargarPersonas(desde: number = 0 ) {

    let url = URL_SERVICIOS + '/persona?desde=' + desde;

    return this.http.get(url);

  }


  buscarPersonas(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/colleccion/personas/' + termino;

    return this.http.get(url)
              .pipe(
                map( (resp: any) => resp.personas));

  }

  desactivarPersona(persona: Persona) {

    let url = URL_SERVICIOS + '/persona/delete/' + persona._id;
    url += '?token=' + this.token;

    return this.http.put( url, persona)
            .pipe(
              map( (resp: any) => {
                Swal.fire('Usuario Desactivado', persona.nombrePer , 'success');
                return resp;
              }));

  }


}
