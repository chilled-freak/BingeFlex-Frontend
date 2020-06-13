import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(public http: HttpClient) { }

  login(data) {
    return this.http.post(`${environment.apiUrl}/user/login`, data);
  }
}
