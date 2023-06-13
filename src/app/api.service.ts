import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://api.geonames.org';
  // private apiUrl = 'http://localhost:5180/api/orderdetail'; //localhost
  private apiUrl = 'http://elsalampapermill-001-site1.htempurl.com/api/orderdetail';

  constructor(private http: HttpClient) { }


  getCountries(): Observable<any> {
    const url = `${this.baseUrl}/countryInfoJSON?username=omarkdyou`;
    return Observable.create((observer: any) => {
      axios.get(url)
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  getCities(countryCode: string) {
    const url = `${this.baseUrl}/searchJSON?country=${countryCode}&maxRows=100&featureClass=P&username=omarkdyou`;
    return axios.get(url);
  }
  
  sendOrderReq(formData: any) {
    return this.http.post(this.apiUrl, formData);
  }


}

