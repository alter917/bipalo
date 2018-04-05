import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { QiitaItem } from './QiitaItem';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class QiitaServiceProvider {

  constructor(public http: Http) {
  }

  private _serverError(err: any) {
    console.log('sever error:', err);
    if(err instanceof Response) {
      return Observable.throw(err.json().message || 'データ取得エラー');
    }

    return Observable.throw(err || 'データ取得エラー');
  }

  getQiitaItems(page, queryOption): Observable<QiitaItem[]>{
    var url:string = '';
    let perPage = 10;

    url = "https://qiita.com/api/v2/items?page=" + page + "&per_page=" + perPage;
    if (queryOption != null &&  queryOption != '') {
      url += ("&query=" + queryOption);
    }

    return this.http.get(url)
      .map(res => <Array<QiitaItem>>res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError);
  }

}
