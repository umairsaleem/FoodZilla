import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";
import * as firebase from "firebase";
import { LoadingSpinnerPage } from "../loading-spinner/loading-spinner";

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-subscription",
  templateUrl: "subscription.html"
})
export class SubscriptionPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth
  ) {}

  private items = [];
  ionViewWillEnter() {
    let user = this.afAuth.auth.currentUser;
    let rootRef = firebase.database().ref();

    let subcriptionRef = rootRef.child("Subcriptions");

    let userPackages = subcriptionRef
      .orderByChild(user.uid + "/userEmail")
      .equalTo(user.email);
    userPackages.once("value", snap => {
      snap.forEach(c => {
        this.items.push({
          SubscribedPackage: c.key,
          isSubscribed: c.child(user.uid + "/isSubscribed").val(),
          plan: c.child(user.uid + "/plan").val()
        });

        return false;
      });
    });
  }

  updateItem(item) {
    let user = this.afAuth.auth.currentUser;
    let rootRef = firebase.database().ref();

    let packageName = item.SubscribedPackage;
    let subcriptionRef = rootRef
      .child("Subcriptions/" + packageName)
      .child(user.uid)
      .update({
        isSubscribed: item.isSubscribed
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}
