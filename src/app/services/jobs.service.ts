import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private baseUrl = 'http://api.geonames.org';
  //private apiUrl = 'http://localhost:5180/api/jobs'; //localhost
  private apiUrl = 'http://elsalampapermill-001-site1.htempurl.com/api/jobs';

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
  getCandidateList() {
    return this.http.get(`${this.apiUrl}/getCandidateList`);
  }
  getCandidate(id: number) {
    return this.http.get(`${this.apiUrl}/getCandidate/${id}`);
  }
  addCandidate(formData: any) {
    return this.http.post(`${this.apiUrl}/addCandidate`, formData);
  }

}