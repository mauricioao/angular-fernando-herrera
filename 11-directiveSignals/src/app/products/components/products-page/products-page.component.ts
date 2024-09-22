import { Component, inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {

  // Otra forma de hacer inyecciones de dependencias
  private fb = inject( FormBuilder )

  public color: string = 'green';

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.email]],
  })

  // constructor(private fb: FormBuilder ) {}

  changeColor() : void {
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }

}
