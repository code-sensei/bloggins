import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Storage } from '@ionic/storage';

import { FeedPage } from '../../pages/feed/feed';
/*
  Generated class for the Createpost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-createpost',
  templateUrl: 'createpost.html'
})
export class CreatepostPage {

  posts: FirebaseListObservable<any>;
  postKey: any;
  userId: any;
  key: any;
  currentUser: any;
  title: any;
  body: any;
  tags: any;
  summary: any;

  constructor(public navCtrl: NavController, public params: NavParams, public af: AngularFire, public localdb: Storage) {

    //use @ionic/Storage to retrieve stored userId
    this.userId = this.localdb.get('myId').then((res)  =>{
        this.currentUser = res;
        console.log('CurrentUser Id from storage: ' + this.currentUser);

        //Get reference to this user's 'posts' child node
        this.posts = af.database.list('Users/' + this.currentUser +  '/posts');

        //Get $key for any newly generated post in the 'posts' node in the database
        this.key = af.database.list('Users/' + this.currentUser +  '/posts').$ref.on('child_added', (snap) => {
        this.postKey = snap.key;

      })

    });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatepostPage');
  }

  //Function: to push/upload  a new post child node  to the 'posts' parent node
  newPost(){

    this.posts.push({
      title: this.title,
      tags: this.tags,
      body: this.body,
      summary: this.summary
    })

    console.log('Post key: ' + this.postKey)

  }


}
