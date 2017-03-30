import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Auth, User , UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import {LoginPage} from '../pages/login/login'

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  defaultPic: any = "http://www.avatarys.com/var/albums/Cool-Avatars/Twitter-Avatars/Cool%20Twitter%20Avatar%20Default%20avatar.png?m=1435520538";
  userMail: any;
  userUsername: any;

  constructor(public http: Http, public auth: Auth, public user: User, public toast: ToastController ){

    console.log('Hello Auth Provider');
  }

  signUp(email, password){
    let details: UserDetails = {'email': email, 'password': password};

    this.auth.signup(details).then(() => {
      // `this.user` is now registered
      //Use ionic native toast/alert to show success message
      const toast = this.toast.create({
        message: 'You have been successfully registered to the Bloggins service. \n Your World Awaits!!!',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

      //Set user details
      this.userMail = this.user.get('email', 'email not found');
      this.userUsername = this.user.get('username', 'usernmae not found');
      
      console.log('user succesfully registered')
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        if (e === 'conflict_email') {
          const toast = this.toast.create({
          message: 'This email already exists in our database. Please use another.',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
        } else {
          // handle other errors
          if (e === 'invalid_email') {
            const toast = this.toast.create({
            message: 'This email is invalid.PLease use another.',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
          }
        }
      }
    });
  }

  login(email, password){
    let details = {'email': email, 'password': password};

    this.auth.login('basic', details).then(() => {
      //Use toast or alert controller to show success message
      const toast = this.toast.create({
        message: 'Welcome To Your World!!',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

      console.log('Login successful')
    }); 
  }


}
