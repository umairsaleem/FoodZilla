import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { PackagesPage } from "../pages/packages/packages";
import { ProfilePage } from "../pages/profile/profile";
import { CategoryPage } from "../pages/category/category";
import { SubscriptionPage } from "../pages/subscription/subscription";
import { LogoutPage } from "../pages/logout/logout";
import { LoadingSpinnerPage } from "../pages/loading-spinner/loading-spinner";

import { Stripe } from "@ionic-native/stripe";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import {
  AngularFireDatabaseModule,
  AngularFireList
} from "angularfire2/database";

import { PackageListProvider } from "../providers/package-list/package-list";
import { SubcribersProvider } from "../providers/subcribers/subcribers";
import { PaymentServiceProvider } from "../providers/payment-service/payment-service";
import { UserProvider } from "../providers/user/user";

export const firebaseAuth = {
  apiKey: "AIzaSyAmUMbwnTbF4PiLD9vPIwLiaTC1JNu5dAA",
  authDomain: "food-app-947b8.firebaseapp.com",
  databaseURL: "https://food-app-947b8.firebaseio.com",
  projectId: "food-app-947b8",
  storageBucket: "food-app-947b8.appspot.com",
  messagingSenderId: "471432551088"
};

export const StripeKey = "pk_test_2gTKsZyVJiv5uc62NI77q3qO";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PackagesPage,
    ProfilePage,
    CategoryPage,
    SubscriptionPage,
    LogoutPage,
    LoadingSpinnerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PackagesPage,
    ProfilePage,
    CategoryPage,
    SubscriptionPage,
    LogoutPage,
    LoadingSpinnerPage
  ],
  providers: [
    StatusBar,
    PaymentServiceProvider,
    SplashScreen,
    Stripe,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PackageListProvider,
    SubcribersProvider,
    UserProvider
  ]
})
export class AppModule {}
