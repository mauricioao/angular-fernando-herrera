import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <p>Counter: {{counter}}</p>
  <button (click)="increaseBy(+1)" >+1</button>
<button (click)="reset()" >Reset</button>
<button (click)="increaseBy(-1)">-1</button>
  `
})

export class CounterComponent implements OnInit {
  constructor() { }
  ngOnInit() { }

  public counter: number = 20;

  increaseBy(num: number): void {
    this.counter += num
  }

  reset(): void{
    this.counter = 20;
  }

}
