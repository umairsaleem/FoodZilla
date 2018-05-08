import { Component , ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PackagesPage } from '../pages/packages/packages';
import { ProfilePage } from '../pages/profile/profile';
import { SubscriptionPage} from '../pages/subscription/subscription'

import { AngularFireAuth } from 'angularfire2/auth';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  
  rootPage: any;
  activePage:any;

  pages : Array<{title: string , component : any}>;


  constructor(public platform: Platform,
       public statusBar: StatusBar,
      public splashScreen: SplashScreen,
       public afAuth: AngularFireAuth)
   {
    

     this.initializeApp();

     this.pages = [
      { title: 'Packages' ,       component:PackagesPage},
      { title: 'My Profile' ,     component:ProfilePage},
      { title: 'My Subcriptions', component:SubscriptionPage}
    
      ];

    this.activePage = this.pages[0];
   
    }

  initializeApp(){
    this.platform.ready().then(() => {
      
      let unsubscribe = this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.rootPage = PackagesPage;
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page){
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page){
    return page == this.activePage;
  }

}



