import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') map?: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {

    if (!this.map) throw new Error('Map element not found');

    const map = new Map({
      container: this.map?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-77.037850, -12.085057], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });
  }

}
