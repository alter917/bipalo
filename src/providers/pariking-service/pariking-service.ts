import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ParkingItem} from './ParkingItem';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {QiitaItem} from "../qiita-service/QiitaItem";

/*
  Generated class for the ParikingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParikingServiceProvider {

  constructor(public http: Http) {
  }

  getParkingList(): Observable<ParkingItem[]> {
    var url: string = '';
    url = 'http://bipalo/bipalo_api.php';

    return this.http.get(url)
      // .map((res) => {
      //   console.log("get shita data: " + (res.json().data as ParkingItem[]));
      //   return <Array<ParkingItem>>res.json();
      // })
      .map((res) => {
        return res.json() as ParkingItem[];
      })
      .do(data => console.log('server data:', data))
      .catch(this._serverError);
  }

  private _serverError(err: any) {
    console.log('sever error:', err);
    if(err instanceof Response) {
      return Observable.throw(err.json().message || 'データ取得エラー');
    }

    return Observable.throw(err || 'データ取得エラー');
  }

}
