import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Auth, User , UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';

import { CreatepostPage } from '../../pages/createpost/createpost';

import {AuthProvider} from '../../providers/auth';

/*
  Generated class for the Feed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [AuthProvider]
})
export class FeedPage {

  content: string = "posts";
  posts: FirebaseListObservable<any>;
  
  userId: any;

  currentUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public aFire: AngularFire, public auth: Auth, public user: User, public localdb: Storage) {
    this.userId = this.localdb.get('myId').then((res) => {
      //Save result into var currentUser
      this.currentUser = res;

      //Get reference to firebase post node in database
      this.posts = aFire.database.list('/Users/' + this.currentUser + '/posts/')

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

  newPost() {
    this.navCtrl.push(CreatepostPage);
  }

}
