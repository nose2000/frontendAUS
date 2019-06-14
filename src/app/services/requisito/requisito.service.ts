import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, retry } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Requisito } from '../../models/requisito.model';
import { PersonaService } from '../persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {

  totalRequisitos: number = 0;

  constructor(
    public http: HttpClient,
    public _personaService: PersonaService
  ) { }

  cargarRequisitos(desde: number = 0) {

    let url = URL_SERVICIOS + '/requisito?desde=' + desde;

    return this.http.get(url);

  }

  cargarRequisito( id: string) {

    let url = URL_SERVICIOS + '/requisito/' + id;

    return this.http.get(url)
              .pipe(
                map( (resp: any) => resp.requisito));

  }

  desactivarRequisito(requisito: Requisito) {

    let url = URL_SERVICIOS + '/requisito/delete/' + requisito._id;
    url += '?token=' + this._personaService.token;

    return this.http.put( url, requisito)
            .pipe(
              map( (resp: any) => {
                Swal.fire('Requisito Desactivado', requisito.requisito , 'success');
                return resp;
              }));

  }

  guardarRequisito(requisito: Requisito) {

    let url = URL_SERVICIOS + '/requisito';

    if ( requisito._id) {
      // actualizando
      url += '/' + requisito._id;
      url += '?token=' + this._personaService.token;

      return this.http.put( url, requisito)
              .pipe(
                map( (resp: any) => {
                Swal.fire('Requisito Actualizado', requisito.requisito, 'success');
                return resp.requisito;
                }));

    } else {
      // creando
      url += '?token=' + this._personaService.token;
      return this.http.post( url, requisito )
            .pipe(
              map( (resp: any) => {
                Swal.fire('Requisito Creado', requisito.requisito, 'success');
                return resp.requisito;
              }));
    }
  }




}
