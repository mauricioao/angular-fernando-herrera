import { Component } from '@angular/core';
import { Color, Hero } from '../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  public isUpperCase: boolean = false;
  public orderBy: keyof Hero | '' = '';
  public mode: 'asc' | 'desc' = 'asc';

  public heroes: Hero[] = [
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.green
    },
    {
      name: 'Linterna Verde',
      canFly: true,
      color: Color.green
    }
  ]

  toggleUpperCase():void{
    this.isUpperCase = !this.isUpperCase
  }

  changeOrder(value: keyof Hero | ''):void{
    if(this.mode === 'asc'){
      this.mode = 'desc'
    }else{
      this.mode = 'asc'
    }
    this.orderBy = value
  }

}
