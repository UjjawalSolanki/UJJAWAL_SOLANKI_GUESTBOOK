import { Component, OnInit } from '@angular/core';
import {TudipApiService} from '../service/tudip-api.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  processLogin = false;
  processSignup = false;
  userLogin =  {
    email: '',
    password: ''
  };
  userSignup =  {
    name: '',
    email: '',
    password: ''
  };

  constructor(private tudipApi: TudipApiService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.processLogin = true;
    this.tudipApi.login(this.userLogin).subscribe((result: any) => {
      console.log(result);
      localStorage.setItem('token', result.token);
      this.router.navigate(['/dashboard']);
      this.processLogin = false;
    }, (error) => {
      alert(error.error.message);
      console.log(error);
      this.processLogin = false;
    });
  }

  signUp() {
    this.processSignup = true;
    this.tudipApi.signUp(this.userSignup).subscribe((result: any) => {
      console.log(result);
      alert('SignedUp Successfully! You can now login');
      this.processSignup = false;
    }, (error) => {
      alert(error.error.message);
      console.log(error);
      this.processSignup = false;
    });
  }

}
