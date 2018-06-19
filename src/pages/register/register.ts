import { Component ,  ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  
  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fire:AngularFireAuth,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser(){
      this.fire.auth.createUserWithEmailAndPassword(this.user.value,this.password.value)
      .then(data => {
        console.log('got data ', data.uid);
        let userId = data.uid;
        let userEmail = data.email;
        let customerId = null;
        firebase.database().ref('users').child(userId).set({userEmail,customerId})
        this.alert('Registered!');
        this.navCtrl.setRoot( LoginPage );
      })
      .catch(error => {
        console.log('got an error ', error);
        this.alert(error.message);
      });
      console.log('Would register user with ', this.user.value, this.password.value);
    }
  
  }