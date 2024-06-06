import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = "";

  @Input()
  public initialValue: string = "";

  // Forma 1, se puede renombrar el evento de emisión con los paréntesis al lado del OutPut sino tomará el valor de la valiable a construir
  // Puedes tipar la variable del Output antes de construir o no
  // @Output("onValue")
  // public onValue: EventEmitter<string> = new EventEmitter();

  // Forma 2
  // @Output() onValue = new EventEmitter<string>();

  // Forma 3, puedes hacer pública la variable
  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  // Esta es una forma de construir el elemento html en el .ts
  // @ViewChild("txtInput")
  // public tagInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(500),
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();

  }

  emitValue(value: string){

    // Esta emisión se usa si se construye el elemento acá en el .ts
    // this.onValue.emit(this.tagInput.nativeElement.value);

    //Si el valor es pasado directamente desde el elemento HTML se recibe en la función y se emite
    this.debouncerSubscription?.unsubscribe();
    this.onValue.emit(value)
    setTimeout(()=>{
      this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300),
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
    })
  }

  onKeyPress(searchTerm: string){
    // console.log(searchTerm);
    this.debouncer.next(searchTerm);

  }

}
