import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { TrackerPage } from '../tracker/tracker';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
username;
password;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController,public afAuth: AngularFireAuth) {
  }
login(){
  let al = this.alertCtrl;
    this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password).then
    (a=>{
      this.navCtrl.setRoot(TrackerPage);
    }).catch(function(error:any) {
      var errorCode = error.code;
      var errorMessage = error.message;

  let alert = al.create({
    title: errorMessage,
    buttons: ['OK']
  });

  if (errorCode == 'auth/weak-password') {
    alert.present();
  } else {
    alert.present();
  }
  console.log(error);
  });

  }
}
