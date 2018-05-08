import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';




/**
 * Generated class for the PackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-packages',
  templateUrl: 'packages.html',
})
export class PackagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagesPage');
  }

  openCategory(){
    this.navCtrl.push(CategoryPage);
  }

  logout()
  {
    this.afAuth
    .auth
    .signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
