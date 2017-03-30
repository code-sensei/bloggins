//import libraries needed
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

//import Pages
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {SignupPage} from '../pages/signup/signup';
import {LoginPage} from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import {CreatepostPage} from '../pages/createpost/createpost';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';


//import Components
import  { SignupComponent } from '../components/signup/signup';
import {LoginComponent } from '../components/login/login';
import { ElasticTextarea } from '../components/elastic-textarea/elastic-textarea';

//import providers
import {AuthProvider} from '../providers/auth';
import { ProfileProvider } from '../providers/profile';
import { FirebaseProvider } from '../providers/firebase';


// AngularFire2 Settings
export const config = {
  apiKey: "AIzaSyB2FzmTYh6lTJDTrn94GolZ3d0AdD4353A",
    authDomain: "bloggins-2bc77.firebaseapp.com",
    databaseURL: "https://bloggins-2bc77.firebaseio.com",
    storageBucket: "bloggins-2bc77.appspot.com",
    messagingSenderId: "907669420740"
};

//Ionic Cloud Settings
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8713f825'
  }
};

export function provideStorage() {
  //Use these options ony for test purposes and change for production then remove this comment
  return new Storage([//'sqlite', 
   'websql'
    //, 'indexeddb'
    ], 
    {name: "id_db"})
}
 
  


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    SignupPage,
    ProfilePage,
    FeedPage,
    CreatepostPage,
    EditProfilePage,
    SignupComponent,
    LoginComponent,
    ElasticTextarea
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    //Initialize AngularFire2
    AngularFireModule.initializeApp(config),
    //Initialize Ionic cloud services
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    SignupPage,
    ProfilePage,
    FeedPage,
    CreatepostPage,
    EditProfilePage,
    SignupComponent,
    LoginComponent,
    ElasticTextarea    
  ],
  providers: [ AuthProvider, ProfileProvider, FirebaseProvider,
    {provide: Storage, useFactory: provideStorage},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
