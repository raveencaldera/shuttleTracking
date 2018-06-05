import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TrackerPage } from '../pages/tracker/tracker';
import { NewDriverPage } from '../pages/new-driver/new-driver';


import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public afAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToTracker(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TrackerPage);
  }goToNewDriver(params){
    if (!params) params = {};
    this.navCtrl.setRoot(NewDriverPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToLogout(params){
    if (!params) params = {};
  this.afAuth.auth.signOut();
  this.navCtrl.setRoot(LoginPage);
  }
}
