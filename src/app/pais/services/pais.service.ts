import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {


  /** URL DEL API: api rest de los paises */
  private apiUrl = 'https://restcountries.com/v2';

  /** FILTRO DE INFORMACION MEDIANTE UN PARAMS (PARAMETRO) */
  get httpParams(): any {
    return new HttpParams().set( 'all?fields=', 'name,capital,alpha2Code,flag,population' );
  }

  /** INYECCIÒN DEL HTTPCLIENT */
  constructor( private http: HttpClient){}

  /** BUSCARPAIS: Mètodo que contiene la URL y los paràmetros como el termino */
  buscarPais( termino: string ): Observable<Country[]>{
    const url = `${ this.apiUrl}/name/${ termino }`;

    /** Retorna la obtenciòn de un arreglo de Country (interface) */
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  /** BUSCARCAPITAL: Mètodo que contiene la URL y los paràmetros como el termino */
  buscarCapital( termino: string ): Observable<Country[]>{
    const urlCapital = `${ this.apiUrl}/capital/${ termino }`;

    return this.http.get<Country[]>(urlCapital, {params: this.httpParams} );
  }

  getPaisPorAlpha( id: string ): Observable<Country>{
    const url = `${ this.apiUrl}/alpha/${ id }`;
    return this.http.get<Country>(url);
  }

  /** BUSCAR-REGIÓN: Método que contiene la URL y los parámetros como el término, esta se
   *  encargara de traer la información regiones mediante el uso de las API's
   */
  buscarRegion( region: string): Observable<Country[]>{
    const url = `${ this.apiUrl}/region/${ region }`;

    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

}
