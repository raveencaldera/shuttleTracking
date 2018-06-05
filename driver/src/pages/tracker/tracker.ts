import { LoginPage } from '../login/login';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html'
})
export class TrackerPage {


  constructor(public afAuth: AngularFireAuth,public navCtrl: NavController,public locationTrackerProvider:LocationTrackerProvider) {

      }
      ionViewDidLoad(){
         if(!this.afAuth.auth.currentUser){
          this.navCtrl.setRoot(LoginPage);
         }else{
           console.log("Loggexd");
         }
      }

      start(){
        this.locationTrackerProvider.startTracking();
      }

      stop(){
        this.locationTrackerProvider.stopTracking();
      }

}
