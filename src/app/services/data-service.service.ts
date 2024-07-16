import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(private afs: AngularFirestore) { }

  getSingleItemByUniqueId(uniqueId: string): Observable<any> {
    return this.afs.collection('userData', ref => ref.where('id', '==', uniqueId)).snapshotChanges().pipe(
      map(actions => {
        if (actions.length === 0) {
          return null;
        }
        const data: any = actions[0].payload.doc.data();
        const id = actions[0].payload.doc.id;
        return { id, ...data };
      })
    );
  }

  updateHobbiesToDB(hobbyList: any, uniqueId: any) {
    console.log(hobbyList, uniqueId)

    return this.afs.collection('userData', ref => ref.where('id', '==', uniqueId)).snapshotChanges().pipe(
      take(1), map(action => {
        if(action.length == 0) {
          throw new Error ('No user found')
        }
        const docId = action[0].payload.doc.id;
        return docId
      })
    ).toPromise().then(docId => {
      // return this.afs.collection('userData').doc(docId).update({hobbies : hobbyList})
      this.afs.collection('userData').doc(docId).update({hobbies : hobbyList})
    }).then(() => {
      console.log('Hobbies successfully updated');
      return 'Success'
    }).catch((err) => {
      console.log('Unable to update', err);
      return 'Failure'
    })
  }
}
