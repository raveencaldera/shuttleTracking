import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NewDriverPage } from '../pages/new-driver/new-driver';
import { TrackerPage } from '../pages/tracker/tracker';

import {Geolocation} from '@ionic-native/geolocation'
import {BackgroundGeolocation} from '@ionic-native/background-geolocation'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
//import { FirebaseProvider } from '../providers/firebase/firebase';
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
    HomePage,
    NewDriverPage,
    TrackerPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewDriverPage,
    TrackerPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider,
    Geolocation,
    BackgroundGeolocation
    //FirebaseProvider
  ]
})
export class AppModule {}
