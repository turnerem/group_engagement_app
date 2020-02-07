import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _registerUrl = "http://192.168.100.131:5000";
  //need register backend api URL
  private _loginUrl = 'http://192.168.100.131:5000/tommy';
  //need users api

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }
// makes http to backend, backend returns userlogin details as response, response sent async to method calling the service


}
