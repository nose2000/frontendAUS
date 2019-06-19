import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {

personas: Persona[] = [];

  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _personaService: PersonaService
  ) { }

  ngOnInit() {

    this.cargarPersonas();
  }

  cargarPersonas() {

    this.cargando = true;

    this._personaService.cargarPersonas( this.desde)
            .subscribe( (resp: any) => {
              this.totalRegistros = resp.total;
              this.personas = resp.personas;
              this.cargando = false;
            });

  }

  // paginacion
  cambiarDesde( valor: number){

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarPersonas();

  }


  buscarPersona( termino: string) {

    if ( termino.length <= 0) {
      this.cargarPersonas();
      return;
    }

    this.cargando = true;

    this._personaService.buscarPersonas( termino)
          .subscribe( (personas: Persona[]) => {
            this.personas = personas;
            this.cargando = false;
          });
  }


  decativarPersona( persona: Persona) {

    if ( persona._id === this._personaService.persona._id) {
      Swal.fire('No se puede desativar Usuario', 'no puede desactivarse a si mismo', 'error');
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({

      title: '¿Esta seguro que desea desactivar al Usuario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Desactivar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      allowOutsideClick: false,

    }).then((result) => {

      if (result.value) {
        // Desactivar
        this._personaService.desactivarPersona(persona)
            .subscribe( () => this.cargarPersonas());

      } else if (
        // cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire('Cancelado', 'no se ha desactivado al Usuario ', 'error' );
      }

    });

  }

}
