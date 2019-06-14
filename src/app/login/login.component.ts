import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonaService } from '../services/service.index';
import { Persona } from '../models/persona.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor(
    public router: Router,
    public _personaService: PersonaService
    ) { }

  ngOnInit() {
    init_plugins();

    // recuerdame
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  ingresar( forma: NgForm) {

    if ( forma.invalid) {
      return;
    }

    // DNIPer, nombrePer, apPaternoPer, apMaternoPer, telefonoPer, password, email, rol
    let persona = new Persona(null, null, null, null, null, forma.value.password, forma.value.email, null);

    this._personaService.login( persona, forma.value.recuerdame)
                  .subscribe( correcto => this.router.navigate(['/dashboard']) );

  }

}
