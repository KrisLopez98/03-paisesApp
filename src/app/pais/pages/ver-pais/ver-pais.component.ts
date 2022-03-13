import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  /** INYECCIÓN DE SERVICIOS  */
  constructor( private activatedRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    /** OBTENCIÓN DE MÁS INFORMACIÓN DE UN PAÍS A PARTIR DEL ID  */
    .pipe(
      switchMap( ({ id }) => this.paisService.getPaisPorAlpha( id ) ),
      /** LA FUNCIÒN DEL TAP ES IMPRIMIR EN CONSOLA EL PRODUCTO QUE RECIBE DEL OBSERVABLE EN SWITCH MAP */
      tap( console.log )
    )
    /** CONOCER EL VALOR DEL ID DEL PAÍS (ABREVIACIÓN DEL PAÍS) */
    .subscribe( pais => this.pais = pais);
  }
}
