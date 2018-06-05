import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { TrackerPage } from '../tracker/tracker';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'page-new-driver',
  templateUrl: 'new-driver.html'
})
export class NewDriverPage {
username;
email;
password;
//public userId:any;
  constructor(private db: AngularFireDatabase,public alertCtrl: AlertController,public navCtrl: NavController,public afAuth: AngularFireAuth) {
  }

  signup(){
  let al = this.alertCtrl;
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(a=>{
      console.log(a);
      this.db.database.ref('drivers/'+a.uid).set(
        {
          lat:'',
          lon:'',
          name:this.username
      } );
      this.navCtrl.push(TrackerPage);



    })
    .catch(function(error:any) {
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
