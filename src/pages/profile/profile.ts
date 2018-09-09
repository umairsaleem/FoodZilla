import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";
import { UserProvider } from "../../providers/user/user";
import { Profile } from "../../app/models/profile.model";
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  profileData: Observable<Profile[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private user: UserProvider
  ) {
    this.profileData = this.user
      .getProfile()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}
