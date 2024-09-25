import { Component, computed, signal } from '@angular/core';

// La señal puede ir fuera de la clase
const name = signal('mauricio');

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10);
  public squareCounter  = computed(() => {
    return this.counter() * this.counter()
  })

  increaseBy( value: number ) {
    this.counter.update( current => current + value );
  }

  constructor() {
    console.log(name());
  }

}
