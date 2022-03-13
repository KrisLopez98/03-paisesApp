import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino = '';
  hayError = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias = false;

  /** INYECCIÒN DEL SERVICIO */
  constructor( private paisService: PaisService) { }

  /** MÈTODO BUSCAR */
  buscar(termino: string): void{
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);


    /** BUSCARPAIS: Mètodo perteneciente al servicio */
    this.paisService.buscarPais( this.termino )
    .subscribe((paises) => {
      console.log(paises);
      this.paises = paises;
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }

  sugerencias( termino: string): void{
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    console.log('termino pero en componente padre' + termino);

    /** Este arreglo se va encargar de mostrar mis sugerencias */
    this.paisService.buscarPais( termino )
      .subscribe( paises => this.paisesSugeridos = paises.splice(0, 5),
        (err) => this.paisesSugeridos = [],
        );
  }

  buscarSugerido( termino: string): void{
    this.buscar(termino);
  }
}
