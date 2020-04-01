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
    return this.http.get('/regions')
    .pipe(map((regions: any) => {
      const kyivRegion = regions[regions.findIndex(region => region.name === 'kiev')];
      const kyivCity   = regions[regions.findIndex(region => region.name === 'kievcity')];
      kyivRegion.confirmed += kyivCity.confirmed;
     
      return regions;
    }))
  }

}
