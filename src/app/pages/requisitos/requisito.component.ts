import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequisitoService } from '../../services/service.index';
import { Requisito } from '../../models/requisito.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styles: []
})
export class RequisitoComponent implements OnInit {

  requisito: Requisito = new Requisito( '' );

  constructor(
    public _requisitoService: RequisitoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];

      if ( id !== 'nuevo') {
        this.cargarRequisito(id);
      }

    });
  }

  ngOnInit() {
  }

  cargarRequisito(id: string) {
    this._requisitoService.cargarRequisito(id)
          .subscribe( requisito => this.requisito = requisito);
  }

  guardarRequisito(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this._requisitoService.guardarRequisito(this.requisito)
          .subscribe( requisito => {

            this.requisito._id = requisito._id;

            this.router.navigate([ '/requisito', requisito._id]);

          });

  }

}
