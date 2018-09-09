import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { NavController} from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { LogoutPage } from "../../pages/logout/logout";

import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import Observable from "rxjs/Observable";
import * as firebase from "firebase";

@Injectable()
export class PaymentServiceProvider {
  userId: string;
  membership: any;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    //this.navCtrl.push(LogoutPage);
    //  this.membership = this.afAuth.authState
    //  .do(user => this.userId = user.uid)
    // .switchMap(user => {
    //    return this.db.object(`users/${user.uid}/pro-membership`).valueChanges();
    //  });
  }

  processPayment(token: any, user: any) {
    let rootRef = firebase.database().ref();
    return rootRef
      .child("users/" + user.uid + "/pro-membership")
      .set({ token: token.id });
  }
}
