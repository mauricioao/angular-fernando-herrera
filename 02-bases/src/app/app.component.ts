import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public title: string = 'Mi primera app de Angular';

  public counter: number = 20;

  increaseBy(num: number): void {
    this.counter += num
  }

  reset(): void{
    this.counter = 20;
  }
}
