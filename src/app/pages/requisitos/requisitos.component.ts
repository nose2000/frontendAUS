import { Component, OnInit } from '@angular/core';
import { Requisito } from '../../models/requisito.model';
import { RequisitoService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styles: []
})
export class RequisitosComponent implements OnInit {

   requisitos: Requisito[] = [];

   desde: number = 0;
   totalRegistros: number = 0;

  constructor(
    public _requisitoService: RequisitoService
  ) { }

  ngOnInit() {
    this.cargarRequisitos();
  }

  cargarRequisitos() {
    this._requisitoService.cargarRequisitos(this.desde)
          .subscribe( (resp: any) => {

            this.totalRegistros = resp.total;
            this.requisitos = resp.requisitos;

          });
  }

  desactivarRequisito(requisito: Requisito) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({

      title: '¿Esta seguro que desea desactivar el Requisito?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Desactivar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      allowOutsideClick: false,

    }).then((result) => {

      if (result.value) {
        // Desactivar
        this._requisitoService.desactivarRequisito(requisito)
            .subscribe( () => this.cargarRequisitos());

      } else if (
        // cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire('Cancelado', 'no se ha desactivado el Requisito ', 'error' );
      }

    });

  }


  //paginacion
  cambiarDesde( valor: number) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarRequisitos();

  }

}
