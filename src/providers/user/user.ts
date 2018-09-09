import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Profile } from "../../app/models/profile.model";
import { AngularFireAuth } from "angularfire2/auth";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  user = this.fire.auth.currentUser;

  constructor(private db: AngularFireDatabase, private fire: AngularFireAuth) {}

  getProfile() {
    return this.db.list<Profile>("users/", ref =>
      ref.orderByChild("userEmail").equalTo(this.user.email)
    );
  }
}
