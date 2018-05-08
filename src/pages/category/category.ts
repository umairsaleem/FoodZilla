import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { PackageListProvider } from '../../providers/package-list/package-list';
import { PackageItem} from '../../app/models/package.model'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers: [PackageListProvider]
})
export class CategoryPage {

  list$ : Observable<PackageItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private list:PackageListProvider ) {
    this.list$ = this.list.getList().snapshotChanges().map(changes => 
      {
        return changes.map(
          c => ({
            key : c.payload.key,...c.payload.val()
          }))
      }
      )
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  thanksMsg(){
    this.navCtrl.push(LogoutPage);
  }

}
