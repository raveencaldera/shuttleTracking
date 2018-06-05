import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ShuttleTrackerPage } from '../pages/shuttle-tracker/shuttle-tracker';
import { LogoutPage } from '../pages/logout/logout';
import { TimeTablePage } from '../pages/timetable/timetable';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { GeoServiceProvider } from '../providers/geo-service/geo-service';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation'
import { DatabaseserviceProvider } from '../providers/databaseservice/databaseservice';

const firebaseConfig = {
  apiKey: "AIzaSyAajNNj-uU2PjHDGo-iSjewoHjCMj1vY6k",
  authDomain: "ip-appp.firebaseapp.com",
  databaseURL: "https://ip-appp.firebaseio.com",
  projectId: "ip-appp",
  storageBucket: "ip-appp.appspot.com",
  messagingSenderId: "561017019089"
};
@NgModule({
  declarations: [
    MyApp,
    ShuttleTrackerPage,
    LogoutPage,
    TimeTablePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShuttleTrackerPage,
    LogoutPage,
    TimeTablePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoServiceProvider,
    BackgroundGeolocation,
    DatabaseserviceProvider
  ]
})
export class AppModule {}
