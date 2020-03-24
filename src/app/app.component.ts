import { Component, ViewChild, OnInit } from '@angular/core';
import { MapService } from './services/map.service';
import { markers } from './app.constants';
import { HttpService } from './services/http.service';

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
  constructor(private map: MapService, private http: HttpService) {
  }

  ngOnInit() {
    this.http.getCasesData()
      .subscribe((res: any) => {
        console.log(res)
        const regionCases = res;

        this.markers = markers.map(marker => {
          const casesData = regionCases.find(region => region.name === marker.id);
          return {
            ...marker,
            cases: casesData.confirmed,
            deaths: casesData.deaths,
            icon: this.getIcon(casesData.confirmed, casesData.deaths)
          }
        });

        this.markers.forEach(marker => {
          if (Number(marker.cases)) { this.casesAll += marker.cases; }
          if (Number(marker.deaths)) { this.deathsAll += marker.deaths; }
        });
      })
  }

  private getIcon(cases, deaths) {
    const shape = deaths ? 'diamond' : 'circle';
    const color = cases < 20 ? 'orange' : cases < 100 ? 'red' : 'purple';
    return `assets/icons/${shape}-${color}.png`;
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
