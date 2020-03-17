import { Component } from '@angular/core';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  lat = 48.4070118;
  lng = 32.6144772;
  constructor(private map: MapService) {

  }
}
