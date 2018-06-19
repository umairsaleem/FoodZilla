import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userEmail;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth:AngularFireAuth) {
  this.userEmail = this.afAuth.auth.currentUser.email;
  }


 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout()
  {
    this.afAuth
    .auth
    .signOut();
    this.navCtrl.setRoot(HomePage);
  }




}
