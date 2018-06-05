import { Injectable,NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
/*
  Generated class for the GeoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoServiceProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public userid:any;

  constructor(public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation,private geolocation: Geolocation) {

  }

  startTracking() {
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

  let options = {
    frequency: 1000,
    enableHighAccuracy: true
  };


  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

    console.log(position);


    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

  });
  }

  stopTracking() {

    console.log('stopTracking');

      this.backgroundGeolocation.stop();
     this.watch.unsubscribe();
  }


}
