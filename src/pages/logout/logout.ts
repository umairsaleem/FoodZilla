import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-logout",
  templateUrl: "logout.html"
})
export class LogoutPage {
  show: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LogoutPage');
    setTimeout(() => {
      this.show = true;
    }, 4000);
  }

  goBack() {
    this.navCtrl.pop();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}
