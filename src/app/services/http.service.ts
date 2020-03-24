import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private firestore: AngularFirestore) {
    
  }

  addRegion(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection('regions')
            .add(data)
            .then(res => {}, err => reject(err));
    });
}

}
