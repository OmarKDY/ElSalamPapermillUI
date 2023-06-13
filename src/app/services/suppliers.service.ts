import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private baseUrl = 'http://api.geonames.org';
  //private apiUrl = 'http://localhost:5180/api/Suppliers'; //localhost
  private apiUrl = 'http://elsalampapermill-001-site1.htempurl.com/api/Suppliers';

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
  getSupplierList() {
    return this.http.get(`${this.apiUrl}/getSupplierList`);
  }
  getSupplier(id: number) {
    return this.http.get(`${this.apiUrl}/getSupplier/${id}`);
  }
  addSupplier(formData: any) {
    return this.http.post(`${this.apiUrl}/addSupplier`, formData);
  }

}