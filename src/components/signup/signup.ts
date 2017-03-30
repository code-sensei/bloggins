import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../../pages/login/login';

import {AuthProvider } from '../../providers/auth'

/*
  Generated class for the Signup component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'signup',
  templateUrl: 'signup.html',
  providers: [AuthProvider]
})
export class SignupComponent {

  //Declare user variables
  user: FirebaseListObservable<any>;
  username: any;
  firebaseUserId: any;
  currentUser: any;
  email: any;
  key: any;
  password: any;

  constructor(public navCtrl: NavController, public af: AngularFire, public authService: AuthProvider, public localdb: Storage) {
    //Get a reference to the users node in the firbase database
    this.user = af.database.list('Users/')

    //Get $key for the newly generated user node and save as unique userId
    this.key = af.database.list('Users/').$ref.on('child_added', (snap) => {
      this.firebaseUserId = snap.key;
    })

   
    }

  //Signup function: Use ionic cloud signup service for authentication
  signup(){
    //Signup and authenticate user via ionic cloud from 'AuthProvider'
    this.authService.signUp(this.email, this.password)

    //Push login page unto nav stack after signup with relevant details
    this.navCtrl.push(LoginPage,{
      username: this.username,
      email: this.email,
      password: this.password
    });

    //Upload user details to our firebase database under Users with appropriate details via 'Angularefire2'
    this.user.push({
      username: this.username,
      email: this.email,
      password: this.password
    });

    console.log('UserId: ' + this.firebaseUserId)

     //use @ionic/storage to store generated currentUser
    //stringify firebaseUserId and store as currentUser id in the storage  to allow other functions to access it via @ionic/storage
    this.localdb.set('myId', this.firebaseUserId);

  }

  //Shift from signup to login pages
  toLogin(){
    this.navCtrl.push(LoginPage);
  }

}
