import { Injectable } from '@angular/core';
import { MarkerManager } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private markerManager: MarkerManager) {
    console.log(markerManager);
  }

  public addMarker(params) {
    this.markerManager.addMarker(params);
  }
}
