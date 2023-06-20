import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductInquiriesService {
  private baseUrl = 'http://api.geonames.org';
  //private apiUrl = 'http://localhost:5180/api/ProductInquiries'; //localhost
  private apiUrl = 'http://elsalampapermill-001-site1.htempurl.com/api/ProductInquiries';

  constructor(private http: HttpClient) { }

  addProductInquiry(formData: any) {
    return this.http.post(`${this.apiUrl}/addProductInquiry`, formData);
  }

}