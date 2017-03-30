import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage} from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import {CreatepostPage} from '../pages/createpost/createpost';
import  { SignupComponent } from '../components/signup/signup';
import { LoginComponent } from '../components/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignupPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'login', component: LoginPage},
      { title: 'Signup', component: SignupPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Feed', component: FeedPage },
      { title: 'New Post', component: CreatepostPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
