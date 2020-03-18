import { Component, ViewChild, OnInit } from '@angular/core';
import { MapService } from './services/map.service';
import { markers } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  lat = 48.4070118;
  lng = 32.6144772;
  markers = [];
  private previous;
  constructor(private map: MapService) {
  }

  ngOnInit() {
    this.markers = markers.map(marker => {
      return {...marker, icon: 'assets/icons/circle-orange.png'};
    });
  }

  public onMarkerClick(e, infowindow) {
    this.closePrevious(infowindow);
  }

  private closePrevious(infowindow) {
    if (this.previous && this.previous.close) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  public onMapClick(e) {
    if (this.previous && this.previous.close) { this.previous.close(); }
  }
}
