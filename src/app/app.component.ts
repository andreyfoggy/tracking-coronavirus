import { Component, OnInit } from '@angular/core';
import { MapService } from './services/map.service';
import { regions } from './app.constants';
import { HttpService } from './services/http.service';

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

  constructor(private map: MapService, private http: HttpService) { }

  ngOnInit() {
    this.http.getCasesData()
      .subscribe(res => {
        this.setMarkers(res);

        this.setSummary();
      })
  }

  private setMarkers(regionCasesCollection: Array<any>) {
    this.markers = regions.map(region => {
      const regionCasesElem = regionCasesCollection.find(item => item.name === region.name);
      console.log(regionCasesElem.name);
      return {
        ...region,
        cases: regionCasesElem.confirmed,
        deaths: regionCasesElem.deaths,
        icon: this.getIcon(regionCasesElem.confirmed, regionCasesElem.deaths)
      }
    });
  }

  private setSummary() {
    this.markers.forEach(marker => {
      if (Number(marker.cases)) { this.casesAll += marker.cases; }
      if (Number(marker.deaths)) { this.deathsAll += marker.deaths; }
    });
  }

  private getIcon(cases: number, deaths: number) {
    const shape = deaths ? 'diamond' : 'circle';
    const color = cases < 20 ? 'orange' : cases < 100 ? 'red' : 'purple';
    return `assets/icons/${shape}-${color}.png`;
  }

  public onMarkerClick(e, infowindow) {
    this.closePreviousInfoWindow(infowindow);
  }

  private closePreviousInfoWindow(infowindow) {
    if (this.previous && this.previous.close) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  public onMapClick(e) {
    if (this.previous && this.previous.close) { this.previous.close(); }
  }
}
