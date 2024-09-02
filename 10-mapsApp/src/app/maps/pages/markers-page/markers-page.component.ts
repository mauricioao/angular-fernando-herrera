import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  color: string;
  marker?: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  public markers: MarkerAndColor[] = [];
  public zoom?: number = 13;
  public currentCenter: LngLat = new LngLat(-77.037850, -12.085057);
  private map?: Map;
  @ViewChild('map') mapDiv?: ElementRef;

  ngAfterViewInit(): void {

    if (!this.mapDiv) throw new Error('Map element not found');

    this.map = new Map({
      container: this.mapDiv?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();
    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Mauricio Aguirre';

    // const marker = new Marker({
    //   draggable: true,
    //   color: 'red',
    //   element: markerHTML
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map?.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true
    }).setLngLat(lngLat).addTo(this.map);

    this.markers.push({
      color,
      marker
    });
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker?.remove();
    this.markers.splice(index, 1);
  }

  flyTo( marker: Marker ){
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker!.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers = JSON.parse(plainMarkersString) as PlainMarker[];

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker( coords, color );
    })
  }

}
