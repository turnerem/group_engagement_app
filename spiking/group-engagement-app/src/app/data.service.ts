import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private _dataUrl = "https://heroku-nc-news.herokuapp.com/api";
  // data api

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(this._dataUrl);
  }
}
