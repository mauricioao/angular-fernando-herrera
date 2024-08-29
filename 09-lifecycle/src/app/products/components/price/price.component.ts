import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public price: number = 0;

  public intervarl$?: Subscription;

  ngOnInit(): void {
    console.log('PriceComponent: ngOnInit');

    this.intervarl$ = interval(1000).subscribe(console.log);

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('PriceComponent: ngOnChanges', {changes});

  }
  ngOnDestroy(): void {
    console.log('PriceComponent: ngOnDestroy');

    this.intervarl$?.unsubscribe();

  }


}
