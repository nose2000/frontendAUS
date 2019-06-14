import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  persona: Persona;

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
    this.persona.rol = persona.rol;
    this.persona.DNIPer = persona.DNIPer;
    this.persona.email = persona.email;

    this._personaService.actualizarPersona(this.persona)
            .subscribe( resp => {
              console.log( resp);
            });
  }





}
