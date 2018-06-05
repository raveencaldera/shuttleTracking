import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


/*
  Generated class for the DatabaseserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseserviceProvider {
  items: FirebaseListObservable<any[]>;
  constructor(public db: AngularFireDatabase) {
     
  }
  publiclistAccounts(): FirebaseListObservable<any[]>{
    return this.db.list('/drivers');


    // ref.on("value", function(snapshot) {
    //    console.log(snapshot.val());
    // }, function (error) {
    //    console.log("Error: " + error.code);
    // });

 }
}
