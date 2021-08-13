import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http: HttpClient) { }

  // Get Passenger Data
  url: any
  getData(pageNo: any) {
    this.url = 'data/?page_no=' + pageNo
    return this.http.get(environment.baseURL.concat(this.url));
  }

}
