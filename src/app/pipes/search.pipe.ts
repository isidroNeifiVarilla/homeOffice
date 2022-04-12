import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(lista: any[], texto: string): any[] {
    if(!texto) return (lista || []).slice(0,0)
    return (lista || []).filter( proyecto => proyecto.title.toUpperCase().includes(texto.toUpperCase()));
  }

}
