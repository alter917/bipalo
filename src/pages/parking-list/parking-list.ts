import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ParkingItem} from '../../providers/pariking-service/ParkingItem';
import {ParikingServiceProvider} from '../../providers/pariking-service/pariking-service';

/**
 * Generated class for the ParkingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parking-list',
  templateUrl: 'parking-list.html',
})
export class ParkingListPage {
  private parkingItems: ParkingItem[];
  private currentPage: number;
  private isError: boolean;
  private errorMessage: string;
  private hasMoreData: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private parkingServiceProvider: ParikingServiceProvider) {
    this.currentPage = 1;
    this.hasMoreData = true;

    this.parkingServiceProvider.getParkingList()
      .subscribe(
        items => {
          console.log("item data:" + items);
          this.parkingItems = items;
        },
        error => {
          console.log(error);
          this.errorMessage = error;
        },
        () => {
        }
      );


      console.log("hairetu is:" + this.parkingItems);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingListPage');
  }

}
