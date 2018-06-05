import { DatabaseserviceProvider } from '../../providers/databaseservice/databaseservice';
import { GeoServiceProvider} from '../../providers/geo-service/geo-service';
import { Component,NgZone } from '@angular/core';
import { NavController,LoadingController} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
// import {} from '@types/googlemaps';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'page-shuttle-tracker',
  templateUrl: 'shuttle-tracker.html'
})
export class ShuttleTrackerPage {
  // map: GoogleMap;
  // mapElement: HTMLElement;
  // public lat: number;
  // public lng: number;
  // constructor(private geoLocation:Geolocation,public navCtrl: NavController,private googleMaps: GoogleMaps,public geoSer:GeoServiceProvider) {

  // }

//   getLocation(){
// this.geoSer.startTracking();
// this.loadMap();
//  console.log(this.geoSer.lat);
//   }

//   ionViewDidLoad() {

//     this.loadMap();
//     this.geoSer.startTracking();
//     console.log(this.geoSer.lat);
//    }


//   loadMap() {
//      this.mapElement = document.getElementById('map');

//      let mapOptions: GoogleMapOptions = {
//        camera: {
//          target: {
//            lat: this.geoSer.lat,
//            lng:  this.geoSer.lng
//          },
//          zoom: 18,
//          tilt: 30
//        }
//      };
// console.log(mapOptions);
//      this.map = this.googleMaps.create(this.mapElement, mapOptions);

//      // Wait the MAP_READY before using any methods.
//      this.map.one(GoogleMapsEvent.MAP_READY)
//        .then(() => {
//          console.log('Map is ready!');

//          // Now you can use all methods safely.
//          this.map.addMarker({
            //  title: 'Shashik',
            //  icon: 'blue',
            //  animation: 'DROP',
            //  position: {
            //    lat: this.geoSer.lat,
            //    lng: this.geoSer.lng
            //  }
//            })
//            .then(marker => {
//              marker.on(GoogleMapsEvent.MARKER_CLICK)
//                .subscribe(() => {
//                  alert('clicked');
//                });
//            });

//        });
//    }


map: any;
markers: any;
autocomplete: any;
GoogleAutocomplete: any;
GooglePlaces: any;
geocoder: any
autocompleteItems: any;
loading: any;
driversData:FirebaseListObservable<any[]>;
constructor(
  public zone: NgZone,
  public geolocation: Geolocation,
  public loadingCtrl: LoadingController,
  public db:DatabaseserviceProvider,
  public fdb:AngularFireDatabase
) {
  console.log(this.db.publiclistAccounts());
  this.geocoder = new google.maps.Geocoder;
  let elem = document.createElement("div")
  this.GooglePlaces = new google.maps.places.PlacesService(elem);
  this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  this.autocomplete = {
    input: ''
  };
  this.autocompleteItems = [];
  this.markers = [];
  this.loading = this.loadingCtrl.create();
}

ionViewDidEnter(){
    // let infoWindow = new google.maps.InfoWindow({map: map});
    //Set latitude and longitude of some place
  this.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.9011, lng: -56.1645},
    zoom: 15
  });
}

mapMarkers(){
  this.driversData = this.db.publiclistAccounts();
}

tryGeolocation(){
  this.loading.present();
  this.clearMarkers();//remove previous markers

  this.geolocation.getCurrentPosition().then((resp) => {
    let pos = {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude
    };

    // let marker = new google.maps.Marker({
    //   position: pos,
    //   map: this.map,
    //   title: 'I am here!'
    // });

    let i = 0;
    this.fdb.list('drivers').subscribe((d) => {
      this.clearMarkers();
      console.log(d);
      if (typeof d != 'undefined' && typeof d[i] != 'undefined' && typeof d[i].lat != 'undefined' && d[i].lon != '') {
        if (d[i].lat != 0 && d[i].lon != 0) {
          const image = 'https://cdn2.iconfinder.com/data/icons/fatcow/32x32/bus.png';
          let poss = {
            lat: d[i].lat,
            lng: d[i].lon,
          };
          let m = {
            position: poss,
            map: this.map,
            icon: "blue",
            title: d[i].name
          };
  
          let marker = new google.maps.Marker({
            position: poss,
            map: this.map,
            icon: image
          });
  
          this.markers.push(marker);
        }

        i++;
      }
      
      if (this.markers.length > 0) {
        for (const m of this.markers) {
          m.setMap(this.map);
        }
      }

    });

    // this.markers.push(marker);
    this.map.setCenter(pos);
    this.loading.dismiss();
    // console.log(pos);
    this.mapMarkers();

  }).catch((error) => {
    console.log('Error getting location', error);
    this.loading.dismiss();
  });
}
// mapMarkers(){
//   let marker = new google.maps.Marker({
//     position: pos,
//     map: this.map,
//     title: 'I am here!'
//   });
// }
updateSearchResults(){
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      if(predictions){
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
  });
}

selectSearchResult(item){
  this.clearMarkers();
  this.autocompleteItems = [];

  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    if(status === 'OK' && results[0]){
      // let position = {
      //     lat: results[0].geometry.location.lat,
      //     lng: results[0].geometry.location.lng
      // };
     // let img = "assets/icon/pin.png"
      let marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: this.map

      });
      this.markers.push(marker);
      this.map.setCenter(results[0].geometry.location);
    }
  })
}

clearMarkers(){
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }
  this.markers = [];
}



}
