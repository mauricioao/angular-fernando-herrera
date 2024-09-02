import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number];
  public divMap?: Map;
  @ViewChild('map') divMapRef?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMapRef) throw new Error('divMapRef is required');
    if (!this.lngLat) throw new Error('lngLat is required');

    this.divMap = new Map({
      container: this.divMapRef?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    // this.generateMarker(this.lngLat, 'red');

    new Marker({
      color: 'red'
    }).setLngLat(this.lngLat)
      .addTo(this.divMap);

  }

  generateMarker(lngLat: [number, number], color: string) {
    if (!this.divMap) return;

    const [lng, lat] = lngLat;
    const coords = new LngLat(lng, lat);
    const marker = new Marker({
      color,
    }).setLngLat(coords).addTo(this.divMap);

  }

}


