import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";
import * as firebase from "firebase";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  @ViewChild("password")
  password;
  @ViewChild("userEmail")
  userEmail;
  @ViewChild("userName")
  userName;
  @ViewChild("address")
  address;
  @ViewChild("phone")
  phone;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fire: AngularFireAuth,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  goBack() {
    this.navCtrl.pop();
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

  registerUser() {
    let address = this.address.value;
    let name = this.userName.value;
    let phone = this.phone.value;

    this.fire.auth
      .createUserWithEmailAndPassword(this.userEmail.value, this.password.value)
      .then(data => {
        console.log("got data ", data.uid);
        let userId = data.uid;

        let userEmail = data.email;
        //let customerId = null;

        firebase
          .database()
          .ref("users")
          .child(userId)
          .set({ name, userEmail, address, phone });
        this.alert("Registered!");
        this.navCtrl.setRoot(LoginPage);
      })
      .catch(error => {
        console.log("got an error ", error);
        this.alert(error.message);
      });
  }
}
