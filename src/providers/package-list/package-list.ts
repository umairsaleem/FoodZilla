import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { PackageItem} from '../../app/models/package.model';

/*
  Generated class for the PackageListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PackageListProvider {

  private $list =  this.db.list<PackageItem>('packages');

  constructor(private db:AngularFireDatabase) {
    console.log('Hello PackageListProvider Provider');
  }

  getList(){
    return this.$list;
  }

  filterCategory(pkgCategory){
    return this.db.list<PackageItem>('packages',
     ref => ref.orderByChild('category').equalTo(pkgCategory));
    
  }


}
