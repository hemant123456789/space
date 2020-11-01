import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemoteApiService {

 
  constructor(private http : HttpClient) { }

  getData(stringurl) {
    let httpUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
    if(stringurl) {
      httpUrl =httpUrl+ stringurl
    }
    
 return this.http.get(httpUrl);
  }
}
