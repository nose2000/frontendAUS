import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/service.index';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  persona: Persona;

  constructor( public _personaService: PersonaService ) { }

  ngOnInit() {
    this.persona = this._personaService.persona;
  }

}
