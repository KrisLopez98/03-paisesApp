import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {
  termino = '';
  hayError = false;
  paises: Country[] = [];

  /** INYECCIÒN DEL SERVICIO */
  constructor( private paisService: PaisService) { }

  /** MÈTODO BUSCAR */
  buscar(termino: string): void{
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);


    /** BUSCARPAIS: Mètodo perteneciente al servicio */
    this.paisService.buscarCapital( this.termino )
    .subscribe((paises) => {
      console.log(paises);
      this.paises = paises;
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }
}
