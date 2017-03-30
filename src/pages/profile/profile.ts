import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EditProfilePage } from '../../pages/edit-profile/edit-profile';

import { ProfileProvider } from '../../providers/profile';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from '../../providers/firebase';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [ProfileProvider, AuthProvider, FirebaseProvider]
})
export class ProfilePage {

  profilePic: any;
  fullname: any;
  dob: any;
  age: any;
  userid: any = Math.random();
  username: any;
  email: any;
  blog: any = 'none';
  disable: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public firebase: FirebaseProvider,  public localdb: Storage) {

    //Get username, email and co. from firebase database through firebaseProvider
    this.firebase.getUserDetails();

    this.localdb.get('name').then((res) => {
      this.fullname = res;
    })

    this.localdb.get('dob').then((res) => {
      this.dob = res;
    })

    this.localdb.get('age').then((res) => {
      this.age = res;
    })

    this.localdb.get('username').then((res) => {
      this.username = res;
      console.log('CurrentUser Profile usernmae: ' + this.username);
    })

    this.localdb.get('email').then((res) => {
      this.email = res;
      console.log('CurrentUser Profile email: ' + this.email);
    })

    //Log above details to amke sure this works
    
    
    
  }

  toEditPage() {
    this.navCtrl.push(EditProfilePage);
  }

  openFileChooser() {

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ProfilePage');
  }

}
