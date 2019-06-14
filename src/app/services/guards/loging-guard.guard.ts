import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';


@Injectable({
  providedIn: 'root'
})
export class LogingGuardGuard implements CanActivate {

  constructor(
    public _personaService: PersonaService,
    public router: Router
    ) { }

    canActivate() {

      if ( this._personaService.estaLogueado()) {
        console.log('paso');
        return true;
      }  else {
        console.log(' no paso');
        this.router.navigate(['/login']);
        return false;
      }
    }



}
