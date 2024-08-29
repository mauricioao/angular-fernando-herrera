import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  public zoom?: number = 10;
  public long?: number;
  public lat?: number;
  private map?: Map;
  public currentCenter: LngLat = new LngLat(-77.037850, -12.085057);

  @ViewChild('map') mapDiv?: ElementRef;


  constructor() { }

  ngAfterViewInit(): void {

    if (!this.mapDiv) throw new Error('Map element not found');

    this.map = new Map({
      container: this.mapDiv?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw new Error('Map element not found');

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', ()=>{
      this.currentCenter = this.map!.getCenter();
      // console.log(this.currentCenter);

    })
  }

  zoomIn() {
    this.map?.zoomIn();

  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChange( value: string ) {
    const zoom = Number(value);
    this.map?.zoomTo(zoom);
  }

}
