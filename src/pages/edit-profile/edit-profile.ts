import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

//Import file chooser
import { FileChooser } from 'ionic-native';

//Import date picker
import { DatePicker } from 'ionic-native';

/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  user: FirebaseListObservable<any>;
  currentUser: FirebaseListObservable<any>;
  userPosts: FirebaseListObservable<any>;
  fullname: any;
  age: any;
  dateOB: any;
  username: any;
  profilePic: any;

  constructor(public navCtrl: NavController, 
                      public navParams: NavParams, 
                      public localdb: Storage, 
                      public af: AngularFire, 
                      public toast: ToastController) {

    //Get current user firebase database tree/node from stored id in local storage
    this.localdb.get('myId').then((res) => {
      //map user id to this.user
      this.user = res;

      console.log("User id from LocalDB: " + this.user)
      //map current user tree/node to this.currentUser
      this.currentUser = af.database.list('Users/' + this.user);
      //map user's post node/tree to this.userPosts
      this.userPosts = af.database.list('Users/' + this.currentUser + '/posts/');
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  chooseFile(){
    FileChooser.open().then((uri) => {
      this.profilePic = uri;
      console.log(this.profilePic);
    }).catch((e) => {
      console.log('Could not pick file');
    })
  }

  pickDate() {
    DatePicker.show({
      date: new Date(),
      mode: 'date'
    }).then((date) => {
      this.dateOB = date;
      console.log(this.dateOB);
    }).catch((e) => {
      console.log('Error' + e);
    })
  }

  saveProfile() {

    //Save new profile details to local storage
    this.localdb.set('username', this.username)
    this.localdb.set('dob', this.dateOB)
    this.localdb.set('profilePic', this.profilePic)
    this.localdb.set('age', this.age)
    this.localdb.set('name', this.fullname)

    this.pushUser();

    console.log("New profile update: " + this.username + " " + this.dateOB + " " + this.profilePic + " " + this.age + " " + this.fullname )
  }

  pushUser() {
    //Push the changes to the firebase tree/node to the currentUser
    this.currentUser.push({
      username: this.username,
      DOB: this.dateOB,
      age: this.age,
      fullname: this.fullname
    })
        //Present success toast
        const toast = this.toast.create({
          message: 'Saved Changes To Profile',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
  }

}
