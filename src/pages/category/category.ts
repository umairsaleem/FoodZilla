import { Component, HostListener, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Select } from "ionic-angular";
import { LogoutPage } from "../logout/logout";
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";
import { LoadingSpinnerPage } from "../loading-spinner/loading-spinner";
import { PackageListProvider } from "../../providers/package-list/package-list";
import { PackageItem } from "../../app/models/package.model";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { SubcribersProvider } from "../../providers/subcribers/subcribers";
import { PaymentServiceProvider } from "../../providers/payment-service/payment-service";
import { StripeKey } from "../../app/app.module";
import * as firebase from "firebase";

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-category",
  templateUrl: "category.html",
  providers: [PackageListProvider]
})
export class CategoryPage {
  list$: Observable<PackageItem[]>;
  token: Observable<any[]>;
  showSpinner: boolean = true;

  handler: any;
  amount = 500;
  userId: string;
  membership: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private list: PackageListProvider,
    private sub: SubcribersProvider,
    private afAuth: AngularFireAuth,
    public pmt: PaymentServiceProvider,
    public db: AngularFireDatabase
  ) {
    this.list$ = this.list
      .getList()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      });
    this.list$.subscribe(() => (this.showSpinner = false));
  }

  //filter data by category
  pickCategory(pkgCategory) {
    this.list$ = this.list
      .filterCategory(pkgCategory)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      });
    this.list$.subscribe(() => (this.showSpinner = false));
  }

  private configHandler() {
    let user = this.afAuth.auth.currentUser;
    this.handler = StripeCheckout.configure({
      key: StripeKey,
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",
      token: token => {
        this.pmt.processPayment(token, user);
      }
    });
  }

  thanksMsg(p) {
    this.handler.open({
      name: p.name,
      excerpt: p.plan,
      amount: ` ${p.price}`,
      currency: "pkr"
    });
    // console.log(this.handler.token);
    this.sub.recordSubscribers(p);
    this.navCtrl.push(LogoutPage);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    this.configHandler();
  }
}
