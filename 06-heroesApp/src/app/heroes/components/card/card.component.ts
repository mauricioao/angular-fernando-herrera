import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {


  @Input() public hero!: any;

  ngOnInit(): void {
    // if(this.hero) throw new Error('Hero property is required');
  }

}
