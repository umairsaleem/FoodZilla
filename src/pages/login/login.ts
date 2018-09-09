import { ViewChild, Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { PackagesPage } from "../packages/packages";
import { RegisterPage } from "../register/register";
import { CategoryPage } from "../category/category";
import * as firebase from "firebase";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  @ViewChild("username")
  user;
  @ViewChild("password")
  password;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fire: AngularFireAuth,
    private alertCtrl: AlertController
  ) {
    // end onAuthStateChanged
  }

  alert(message: string) {
    this.alertCtrl
      .create({
        title: "Info!",
        subTitle: message,
        buttons: ["OK"]
      })
      .present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  openRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  loginUser() {
    this.fire.auth
      .signInWithEmailAndPassword(this.user.value, this.password.value)
      .then(data => {
        console.log("got some data", this.fire.auth.currentUser);
        this.alert("Success! You're logged in");
        this.navCtrl.setRoot(CategoryPage);
        // user is logged in
      })
      .catch(error => {
        console.log("got an error", error);
        this.alert(error.message);
      });
    console.log("Would sign in with ", this.user.value, this.password.value);
  }
}
