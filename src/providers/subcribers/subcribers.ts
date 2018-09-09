import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Subcriber } from "../../app/models/subscriber.model";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";

@Injectable()
export class SubcribersProvider {
  address: any;
  constructor(private fire: AngularFireAuth) {
    let user = this.fire.auth.currentUser;
    var userRef = firebase.database().ref("users/" + user.uid);
    userRef.on("value", snap => {
      this.address = snap.child("address").val();
      //console.log(address);
    });
  }

  recordSubscribers(p) {
    let user = this.fire.auth.currentUser;
    let rootRef = firebase.database().ref();

    let packageName = p.name;
    let plan = p.plan;
    let subcriptionRef = rootRef
      .child("Subcriptions/" + packageName)
      .child(user.uid)
      .set({
        userEmail: user.email,
        plan: plan,
        address: this.address,
        isSubscribed: true
      });
  }
}
