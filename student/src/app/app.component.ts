import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LogoutPage } from '../pages/logout/logout';
import { TimeTablePage } from '../pages/timetable/timetable';


import { ShuttleTrackerPage } from '../pages/shuttle-tracker/shuttle-tracker';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = ShuttleTrackerPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToShuttleTracker(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ShuttleTrackerPage);
  }goToLogout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LogoutPage);
  }

  goToTimeTable(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TimeTablePage);
  }
}
