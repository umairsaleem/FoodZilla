import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Subcriber } from '../../app/models/subscriber.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class SubcribersProvider {

  constructor( private fire:AngularFireAuth) {
    console.log('Hello SubcribersProvider Provider');}
  
      recordSubscribers(p)
      {
        
        let user = this.fire.auth.currentUser;
        let rootRef = firebase.database().ref();
        
        let packageName = p.name;
        let subcriptionRef = rootRef.child('Subcriptions/'+ packageName)
                                    .child(user.uid)
                                    .set({
                                          userEmail :  user.email,
                                          isSubscribed : true
                                   });
      }
}

