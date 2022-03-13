import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{
  /** EVENTO ENTER */
 @Output() Enter: EventEmitter<string> = new EventEmitter();

 /** EVENTO DEBOUNCE */
 @Output() Debounce: EventEmitter<string> = new EventEmitter();

 @Input() placeholder = '';

  debouncer: Subject<string> = new Subject();

  termino = '';

  /** PROPIEDAD que utilizamos para utilizar el debouncer y suscribirnos a sus métodos */
  ngOnInit(): void {
    /* CONFIGURACION DEL DEBOUNCER */
    this.debouncer
    .pipe( debounceTime(300))
    .subscribe( valor => {
      this.Debounce.emit( valor );
    });
  }

  buscar(): void{
    this.Enter.emit(this.termino);
  }

  /**  Método que se utiliza para iterar el termino cada vez que se presione enter */
  teclaPresionada(): void{
    /* EJECUTANDO LA CONFIGURACION DEL DEBOUNCER */
    this.debouncer.next( this.termino );
  }
}
