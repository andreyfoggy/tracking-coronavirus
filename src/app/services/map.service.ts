import { Injectable } from '@angular/core';
import { MarkerManager } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private markerManager: MarkerManager) {

  }

  public addMarker(params) {
    this.markerManager.addMarker(params);
  }
}
