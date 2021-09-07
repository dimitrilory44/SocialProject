import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { apiResponse } from '../_models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) {}

  testApi() :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL).pipe(map(result => {
      return result;
    }));
  }

  getPosts() :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/posts').pipe(map(result => {
      return result;
    }));
  }
}
