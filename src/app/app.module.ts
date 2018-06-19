import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';

import { AdminPage } from '../pages/admin/admin';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { MapComponent } from '../components/map/map';
import { PusherProvider } from '../providers/pusher/pusher';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Geofence } from '@ionic-native/geofence';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

@NgModule({
  declarations: [MyApp, AdminPage, HomePage, TabsPage, MapComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'GOOGLE_API_KEYs',
      libraries: ['geometry'],
    }),
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AdminPage, HomePage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PusherProvider,
    HttpClient,
    Geofence,
    PhonegapLocalNotification,
  ],
})
export class AppModule {}
