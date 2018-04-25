import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ParkingListPage } from '../pages/parking-list/parking-list';
import {MapPage} from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QiitaServiceProvider } from '../providers/qiita-service/qiita-service';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ParikingServiceProvider } from '../providers/pariking-service/pariking-service';

import { GoogleMaps } from "@ionic-native/google-maps";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ParkingListPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ParkingListPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QiitaServiceProvider,
    InAppBrowser,
    ParikingServiceProvider,
    GoogleMaps
  ]
})
export class AppModule {}
