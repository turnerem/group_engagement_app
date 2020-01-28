import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})
export class ApiClientService {
 constructor(private http: HttpClient) {
 }

 createPresentation(repo) {
   return this.perform('post', '/presentations', repo);
 }

 getPresentations() {
   return this.perform('get', '/presentations');
 }

 getPresentation(repo) {
   return this.perform('get', `/presentations/${repo.id}`);
 }

 async perform (method, resource, data = {}) {
   const url = `http://localhost:4433${resource}`;

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