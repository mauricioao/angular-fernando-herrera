import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  public name: string = 'ironman';
  public age: number = 45;

  get capitalizeName():string{
    return this.name.toLocaleUpperCase();
  }

  getHeroDescription(): string {
    return `${this.name} - ${this.age}`
  }

  //arrow function
  changeName = (): void =>{
    const tupla: [string, string] = ["ironman", "mauricio"]
    this.name = tupla.filter(word=>word!==this.name)[0]
  }

  changeName2() {
     this.name = "mauricio"
  }

  //function expression
  changeAge(): void {
    const tupla: [number, number] = [45, 33];
    this.age = tupla.filter(a=>a!==this.age)[0]
  }

  resetForm() {
    this.name = "ironman"
    this.age = 45
  }
}
