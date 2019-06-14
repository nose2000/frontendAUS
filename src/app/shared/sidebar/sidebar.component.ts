import { Component, OnInit } from '@angular/core';
import { SidebarService, PersonaService } from 'src/app/services/service.index';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  persona: Persona;

  constructor(
    public _sidebar: SidebarService,
    public _personaService: PersonaService
  ) { }

  ngOnInit() {
    this.persona = this._personaService.persona;
  }

}
