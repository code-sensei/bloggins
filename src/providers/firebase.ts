import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Storage } from '@ionic/storage';
/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseProvider {

  currentUser: any;
  username: any;
  email: any;
  userId: any;

  constructor(public http: Http, public af: AngularFire, public localdb: Storage) {

    //Get currentUser from local storage and store to this.currentUser
    this.userId = this.localdb.get('myId').then((res) => {
      this.currentUser = res;
    
    //Get currentUser's username from firebase database and store as this,username
    af.database.list('Users/' + this.currentUser).$ref.once('value', (snap) => {
      this.username = snap.val().username;
    })

    //Get currentUser's email address from firebase database and store as this.email
    af.database.list('Users/' + this.currentUser).$ref.once('value', (snap) => {
      this.email = snap.val().email;
    })

    //Log the above to make sure it works fine
    console.log('Current User\'s username From Firebase Service: ' + this.username);
    console.log('Current User\'s email From Firebase Service: ' + this.email);
    console.log('Hello Firebase Provider');
    })

  }

  getUserDetails() {

    //Get currentUser from local storage and store to this.currentUser
    this.userId = this.localdb.get('myId').then((res) => {
      this.currentUser = res;
    
    //Get currentUser's username from firebase database and store as this,username
    this.af.database.list('Users/' + this.currentUser).$ref.once('value', (snap) => {
      this.username = snap.val().username;
      this.localdb.set('username', this.username);
    })

    //Get currentUser's email address from firebase database and store as this.email
    this.af.database.list('Users/' + this.currentUser).$ref.once('value', (snap) => {
      this.email = snap.val().email;
      this.localdb.set('email', this.email)
    })

    //Log the above to make sure it works fine
    console.log('Current User\'s username From Firebase Service2: ' + this.username);
    console.log('Current User\'s email From Firebase Service2: ' + this.email);
    console.log('Hello Firebase Provider');
  })
  
  }

}
