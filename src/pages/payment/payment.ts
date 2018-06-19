import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentServiceProvider} from '../../providers/payment-service/payment-service';
import {  StripeKey } from '../../app/app.module';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
    handler:any;
    amount:number = 500;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private paymentSrvc:PaymentServiceProvider) {
  }

  ionViewDidLoad() {
    
  }

}
