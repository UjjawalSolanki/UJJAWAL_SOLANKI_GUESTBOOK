import { Component, OnInit } from '@angular/core';
import {TudipApiService} from '../service/tudip-api.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WidgetUtilService} from "../service/widget-util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  processLogin = false;
  processSignup = false;
  userLoginForm: FormGroup;
  userSignupForm: FormGroup;
  emailLogin: FormControl;
  passwordLogin: FormControl;
  nameSignup: FormControl;
  emailSignup: FormControl;
  passwordSignup: FormControl;

  constructor(private tudipApi: TudipApiService, private router: Router, private widgetUtil: WidgetUtilService) {
    localStorage.clear();
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.emailLogin = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.emailSignup = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.passwordLogin = new FormControl('', [
      Validators.required
    ]);
    this.passwordSignup = new FormControl('', [
      Validators.required
    ]);
    this.nameSignup = new FormControl('', [
      Validators.required
    ]);
  }

  createForm() {
    this.userLoginForm = new FormGroup({
      emailLogin: this.emailLogin,
      passwordLogin: this.passwordLogin
    });
    this.userSignupForm = new FormGroup({
      nameSignup: this.nameSignup,
      emailSignup: this.emailSignup,
      passwordSignup: this.passwordSignup
    });
  }

  login() {
    const userLoginObj = {
      'email' : this.userLoginForm.value.emailLogin,
      'password' : this.userLoginForm.value.passwordLogin
    };
    this.processLogin = true;
    this.tudipApi.login(userLoginObj).subscribe((result: any) => {
      localStorage.setItem('token', result.token);
      this.router.navigate(['/dashboard']);
      this.processLogin = false;
    }, (error) => {
      this.widgetUtil.openSnackBar(error.error.message, 'Ok');
      this.processLogin = false;
    });
  }

  signUp() {
    const userSignupObj = {
      'name' : this.userSignupForm.value.nameSignup,
      'email' : this.userSignupForm.value.emailSignup,
      'password' : this.userSignupForm.value.passwordSignup
    };
    this.processSignup = true;
    this.tudipApi.signUp(userSignupObj).subscribe((result: any) => {
      this.widgetUtil.openSnackBar('SignedUp Successfully! You can now login', 'Ok');
      this.processSignup = false;
      this.userSignupForm.reset();
      this.userLoginForm.reset();
    }, (error) => {
      this.widgetUtil.openSnackBar(error.error.message, 'Ok');
      this.processSignup = false;
    });
  }

}
