import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
    
  }

  addRegion(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection('regions')
            .add(data)
            .then(res => {
              console.log(res)
            }, err => console.log(err));
    });
  }

  getData() {
    this.http.get('https://cdn.pravda.com/cdn/covid-19/ukraine.json')
      .subscribe(res => {
        console.log(res)
      });
  }

}
