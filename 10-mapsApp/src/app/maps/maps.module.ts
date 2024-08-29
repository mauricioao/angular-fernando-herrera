import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmljaW9hIiwiYSI6ImNtMGVhMXgwMTBtc2MybXBpb2t2MWpwc3UifQ.WRrAfOuQHd3KQ3UL_Ctbnw';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
  ]
})
export class MapsModule { }
