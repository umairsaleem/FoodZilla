import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
  }

  logout()
  {
    this.afAuth
    .auth
    .signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
