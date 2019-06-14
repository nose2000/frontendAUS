import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'personas'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img) {
      return url + '/personas/xxxx';
    }

    switch (tipo) {
      case 'personas':
        url += '/personas/' + img;
        break;

        default:
        console.log('topipo de imagen no existe');
        url += '/personas/xxxx';
    }

    return url;
  }

}
