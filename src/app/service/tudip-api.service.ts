import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TudipApiService {

  private baseUrl = 'https://ujjawal-solanki-guestbook.herokuapp.com';

  constructor(private http: HttpClient) { }

  login(body) {
    return this.http.post(this.baseUrl + '/api/auth/login', body);
  }

  signUp(body) {
    return this.http.post(this.baseUrl + '/api/auth/register', body);
  }

  getVisitor(id) {
    return this.http.get(this.baseUrl + '/api/visitors/' + id);
  }

  getVisitors() {
    return this.http.get(this.baseUrl + '/api/visitors');
  }

  removeVisitor(id) {
    return this.http.delete(this.baseUrl + '/api/visitors/' + id);
  }

  updateVisitor(body) {
    return this.http.post(this.baseUrl + '/api/visitors/' + body.id, body);
  }

  addVisitor(body) {
    return this.http.post(this.baseUrl + '/api/visitors/store', body);
  }

}
