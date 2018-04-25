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
  private queryOption;
  string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private parkingServiceProvider: ParikingServiceProvider) {
    this.currentPage = 1;
    this.hasMoreData = true;

    this.parkingServiceProvider.getParkingList(this.currentPage, this.queryOption)
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

  doInfinite(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.currentPage += 1;

        this.parkingServiceProvider.getParkingList(this.currentPage, this.queryOption)
          .subscribe(
            items => {
              this.parkingItems = this.parkingItems.concat(items);
              if (this.currentPage >= 2 && items.length == 0) {
                this.hasMoreData = false;
              }
              console.log(items);
              this.isError = false;
            },
            err => {
              console.log(err);
              this.errorMessage = err;
              this.isError = true;
            },
            () => {
            });

        resolve();
      }, 500);
    });
  }

  doRefresh(refresher) {
    this.currentPage = 1;

    setTimeout(() => {
      this.parkingServiceProvider.getParkingList(this.currentPage, this.queryOption)
        .subscribe(items => {
          this.parkingItems = items;
          console.log(items);
        },
          err => {
            console.log(err);
          },
          () => {});
      refresher.complete();
    }, 500);
  }

}
