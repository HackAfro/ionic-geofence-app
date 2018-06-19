import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { Geofence } from '@ionic-native/geofence';

declare const google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    private loader: MapsAPILoader,
    private geolocation: Geolocation,
    private http: HttpClient,
    private geofence: Geofence,
    private platform: Platform
  ) {
    if (this.platform.is('cordova')) {
      this.platform.ready().then((_) => {
        geofence.initialize().then((_) => {
          console.log('Geofence Plugin Ready');
        });
      });
    }
  }
  // center = {
  //   lat: 6.435838,
  //   lng: 3.451384,
  // };
  center = {
    lat: 6.4393477,
    lng: 3.5244628999999996,
  };
  zoom = 15;
  address = '';
  state = '';

  private createGeofence() {
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude: this.center.lat, //center of geofence radius
      longitude: this.center.lng,
      radius: 1000, //radius to edge of geofence in meters
      transitionType: 2,
    };

    this.geofence
      .addOrUpdate(fence)
      .then(
        () => console.log('Geofence added'),
        (err) => console.log('Geofence failed to add', err)
      );
    this.geofence.onTransitionReceived().subscribe((res) => {
      this.notify(this.center);
    });
  }

  reverseGeocode(latLng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const address = results[0].formatted_address;
          const addressList = address.split(',');
          this.address = addressList[0];
          this.state = addressList.slice(2).join(', ');
        }
      }
    });
  }

  pingLocation(location) {
    this.http
      .post('http://localhost:4000/ping', location)
      .subscribe((res) => {});
  }

  notify(location) {
    this.http
      .post('http://localhost:4000/notify', location)
      .subscribe((res) => {});
  }

  ngOnInit() {
    this.loader.load().then(() => {
      this.reverseGeocode(this.center);
      this.pingLocation(this.center);
    });
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.createGeofence();
        const watch = this.geolocation.watchPosition();
        watch.subscribe((position) => {
          console.table(position);
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.reverseGeocode(this.center);
          this.pingLocation(this.center);
        });
      }
    });
  }
}
