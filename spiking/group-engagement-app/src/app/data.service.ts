import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private _dataUrl = "http://192.168.100.131:5000/dancingBB";
  // data api http://192.168.100.131:5000/dancingBB

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(this._dataUrl);
  }
}
