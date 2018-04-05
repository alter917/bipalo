import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QiitaServiceProvider } from '../../providers/qiita-service/qiita-service';
import { QiitaItem } from '../../providers/qiita-service/QiitaItem';

import { ParkingListPage } from '../../pages/parking-list/parking-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  qiitaItems: QiitaItem[];
  private currentPage: number;
  private isError: boolean;
  private errerMessage: string;
  private queryOption; string;
  private hasMoreData: boolean;

  constructor(public navCtrl: NavController, private qiitaServiceProvider: QiitaServiceProvider) {
    this.currentPage = 1;
    this.hasMoreData = true;
    this.queryOption = encodeURI("user:kijibato");
    console.log(this.queryOption);

    this.qiitaServiceProvider.getQiitaItems(this.currentPage, this.queryOption)
      .subscribe(items => {
          this.qiitaItems = items;
          console.log(items);
          this.errerMessage = '';
          this.isError = false;
        },
        err => {
          console.log(err);
          this.errerMessage = err;
          this.isError = true; ;
        },
        () => {});
  }

  getTagList(tags) {
    var names = tags.map(function(element, index, array) {
      return element.name;
    });
    return names.join(', ');
  }

  doRefresh(refresher) {
    this.currentPage = 1;

    setTimeout(() => {
      this.qiitaServiceProvider.getQiitaItems(this.currentPage, this.queryOption)
        .subscribe(items => {
            this.qiitaItems = items;
            console.log(items);
          },
          err => console.log(err),
          () => {});

      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentPage += 1;

        this.qiitaServiceProvider.getQiitaItems(this.currentPage, this.queryOption)
          .subscribe(items => {
              this.qiitaItems = this.qiitaItems.concat(items);
              if (this.currentPage >= 2 && items.length == 0) {
                this.hasMoreData = false;
              }
              console.log(items);
              this.isError = false;
            },
            err => {
              console.log(err)
              this.errerMessage = err
              this.isError = true;
            },
            () => {});

        resolve();
      }, 1000);
    })
  }

  onTap(externalPage) {
    var options = [
      'location=no',
      'enableViewportScale=yes',
      'transitionstyle=crossdissolve',
      'closebuttoncaption=x'
    ];
    window.open(externalPage, '_blank', options.join());
  }

  goParkingListPage() {
    this.navCtrl.push(ParkingListPage);
  }

}
