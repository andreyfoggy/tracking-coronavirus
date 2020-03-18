import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule, MarkerManager, GoogleMapsAPIWrapper } from '@agm/core';
import { AppComponent } from './app.component';
import { MapService } from './services/map.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCfvM1t5Hb_WywtcO6BEXtEUOuJlCpWszY',
    })
  ],
  providers: [MapService, MarkerManager, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
