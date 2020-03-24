import { Component, ViewChild, OnInit } from '@angular/core';
import { MapService } from './services/map.service';
import { markers } from './app.constants';

enum IconColors  {
  orange = 20
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  lat = 48.4070118;
  lng = 32.6144772;
  markers = [];
  casesAll = 0;
  deathsAll = 0;
  private previous;
  constructor(private map: MapService) {
  }

  ngOnInit() {
    this.markers = markers.map((marker: any) => {
      marker.icon = this.getIcon(marker.cases, marker.deaths);
      return marker;
    });
    this.markers.forEach(marker => {
      if (Number(marker.cases)) { this.casesAll += marker.cases; }
      if (Number(marker.deaths)) { this.deathsAll += marker.deaths; }
    });
  }

  private getIcon(cases, death) {
    return 'assets/icons/circle-orange.png'
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
