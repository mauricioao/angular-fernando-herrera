import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []), //primer valor es el valor por defecto, segundo es los validadores sincronos, tercero es los validadores asincronos
  //   price: new FormControl(0, [], []),
  //   isStorage: new FormControl(0, [], []),
  // });

  public myForm2: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required ,Validators.min(0)]],
    isStorage: [0, [Validators.required ,Validators.min(0)]],
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.myForm2.reset({ name: 'RTX 4090', price: 10, isStorage: 10 });
  }

  isValidField( field: string ): boolean | null{
    return this.myForm2.controls[field].errors && this.myForm2.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm2.controls[field]) {
      return null;
    }
    const errors = this.myForm2.controls[field].errors || {};

    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }

    }

    return null;

    // if (errors['required']) {
    //   return 'Este campo es requerido';
    // } else if (errors['minlength']) {
    //   return `Este campo requiere como minimo ${errors['minlength'].requiredLength} caracteres`;
    // }
  }


  onSave(): void {
    if (this.myForm2.invalid) {
      this.myForm2.markAllAsTouched();
      return;
    }
    console.log(this.myForm2.value);
    this.myForm2.reset({ price: 10, isStorage: 0 });
  }

}
