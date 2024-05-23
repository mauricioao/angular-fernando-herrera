import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrl: './gif-card.component.scss'
})
export class GifCardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if(!this.gif) throw new Error("Gif property is required");
  }
}
