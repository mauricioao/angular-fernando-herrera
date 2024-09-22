import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _error?: ValidationErrors | null;

  @Input() set color(value: string) {
    // console.log({ color: value});
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._error = value;
    // console.log(value);
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    // console.log('Directiva - constructor');
    // console.log(this.el);
    this.htmlElement = this.el;
   }
  ngOnInit(): void {
    // console.log('Directiva - ngOnInit');
  }

  setStyle():void {
    if(!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage():void {
    if(!this.htmlElement) return;
    if(!this._error) {
      this.htmlElement.nativeElement.innerText = '';
      return
    }
    const errores = Object.keys(this._error);
    if(errores.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if(errores.includes('minlength')) {
      this.htmlElement.nativeElement.innerText = `El número de caracteres mínimo es de ${this._error['minlength'].requiredLength}`;
      return;
    }
    if(errores.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'El valor debe ser un correo';
      return;
    }
  }
}
