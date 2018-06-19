import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PusherProvider } from '../../providers/pusher/pusher';
import { Platform } from 'ionic-angular';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

declare const google;
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage implements OnInit {
  constructor(
    public navCtrl: NavController,
    private pusher: PusherProvider,
    private platform: Platform,
    private localNotification: PhonegapLocalNotification
  ) {
    if (platform.is('cordova')) {
      platform.ready().then((_) => {
        this.localNotification.requestPermission().then((perm) => {
          if (perm === 'granted') this.permissionGranted = true;
        });
      });
    }
  }

  tab = 'location';
  notifications = [];
  center = {
    lat: 6.435838,
    lng: 3.451384,
  };
  permissionGranted = false;
  address = '';

  reverseGeocode(latLng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const address = results[0].formatted_address;
          const addressList = address.split(',');
          this.address = addressList[0];
        }
      }
    });
  }

  ngOnInit() {
    const locationChannel = this.pusher.init('location');
    const geofenceChannel = this.pusher.init('location');

    locationChannel.bind('ping', (data) => {
      this.center = {
        ...data,
      };
    });

    geofenceChannel.bind('exit', (data) => {
      this.reverseGeocode(data);

      if (this.permissionGranted) {
        this.localNotification.create('Geofence exited', {
          tag: 'message1',
          body: 'User has exited the defined geofence',
          icon: 'assets/imgs/user.svg',
        });
      }
      const notification = {
        header: 'User has exited the geofence',
        body: `Current location: ${this.address}`,
      };

      this.notifications = this.notifications.concat(notification);
    });
  }
}
