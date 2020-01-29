import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})
export class ApiClientService {
 constructor(private http: HttpClient) {
 }

 createMeeting(repo) {
   return this.perform('post', '/meetings', repo);
 }

 getMeetings() {
   return this.perform('get', '/meetings');
 }

 getMeeting(repo) {
   return this.perform('get', `/meetings/${repo.id}`);
 }

 async perform (method, resource, data = {}) {
   const url = `http://localhost:4433${resource}`;
    console.log('resource', resource)
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
      //  'Authorization': `Bearer ${accessToken}`
     })
   };

   switch (method) {
     case 'delete':
       return this.http.delete(url, httpOptions).toPromise();
     case 'get':
       return this.http.get(url, httpOptions).toPromise();
     default:
       return this.http[method](url, data, httpOptions).toPromise();
   }
 }
}