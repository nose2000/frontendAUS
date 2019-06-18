import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  persona: Persona;

  imagenSubir: File ;
  imagenTemp: any;

  constructor(
    public _personaService: PersonaService
  ) {
    this.persona = this._personaService.persona;
   }

   ngOnInit() {
   }

  guardar( persona: Persona) {


    this.persona.nombrePer = persona.nombrePer;
    this.persona.apPaternoPer = persona.apPaternoPer;
    this.persona.apMaternoPer = persona.apMaternoPer;
    this.persona.telefonoPer = persona.telefonoPer;
    this.persona.email = persona.email;

    this._personaService.actualizarPersona(this.persona)
            .subscribe();
  }

  seleccionImagen( archivo: File) {

    if ( !archivo) {
      this.imagenSubir = null;
      return;
    }

    // validacion de si es una imagen
    if ( archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo Imagenes', 'El archivo seleccionado no es una Imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // visualisacion de imagen temporal
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this._personaService.cambiarImagen(this.imagenSubir, this.persona._id);

  }



}
