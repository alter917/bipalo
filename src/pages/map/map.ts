import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
  }
  onButtonClick($event) {
    this.loadMap();
  }

  loadMap() {
    // 表示したい位置にある<div>のidを指定します
    this.map = GoogleMaps.create('map_canvas');

    // MAP_READYイベントが来るまで待ちます
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('地図が準備完了！');
    });
  }



}
