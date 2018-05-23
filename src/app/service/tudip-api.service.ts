import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TudipApiService {

  private tudipApiBaseUrl = 'http://atithi.dev.tudip.com';

  constructor(private http: HttpClient) { }

  login(body) {
    return this.http.post(this.tudipApiBaseUrl + '/api/auth/login', body);
  }

  signUp(body) {
    return this.http.post(this.tudipApiBaseUrl + '/api/auth/register', body);
  }

  getVisitors() {
    return this.http.get(this.tudipApiBaseUrl + '/api/visitors');
  }

  removeVisitor(id) {
    return this.http.delete(this.tudipApiBaseUrl + '/api/visitors/' + id);
  }

  updateVisitor(body) {
    return this.http.post(this.tudipApiBaseUrl + '/api/visitors/' + body.id, body);
  }

  addVisitor(body) {
    return this.http.post(this.tudipApiBaseUrl + '/api/visitors/store', body);
  }

}
