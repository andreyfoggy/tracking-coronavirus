import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
  }

  getCasesData() {
    return this.http.get('https://cdn.pravda.com/cdn/covid-19/ukraine.json')
    .pipe(map((res: any) => {
      console.log(res);
      const regions = res.regions.regions;
      const kyivRegion = regions[regions.findIndex(region => region.name === 'kiev')];
      const kyivCity   = regions[regions.findIndex(region => region.name === 'kievcity')];
      kyivRegion.confirmed += kyivCity.confirmed;

      return regions;
    }))
  }

}
