import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../../pages/signup/signup';
import { FeedPage } from '../../pages/feed/feed';

import { AuthProvider } from '../../providers/auth';

/*
  Generated class for the Login component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'login',
  templateUrl: 'login.html',
  providers: [AuthProvider]
})
export class LoginComponent {

 //Declare user details
 username: any;
 password: any;
 email: any;

  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthProvider) {
    //Get passed parameters from the sign up process for login
    this.username = this.params.get('usernmae');
    this.password = this.params.get('password');
    this.email = this.params.get('email');
  }

  //Login function: Makes use of ionic cloud service for auhtentication as implemented in 'AuthProvider'
  login(){
    this.authService.login(this.email, this.password)

    this.navCtrl.push(FeedPage);
  }

  //Shift from login to signup page
  toSignup(){
    this.navCtrl.push(SignupPage);
  }

}
