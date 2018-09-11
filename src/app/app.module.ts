import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { AddPlayerModalPage } from '../pages/game/add-player-modal/add-player-modal';
import { GamePage } from '../pages/game/game';
import { PipesModule } from '../pipes/pipes.module';

const firebase = {
  apiKey: "AIzaSyBa6MpGPWOHpIaWPlTstDHmKv196XOwhNs",
  authDomain: "live-game-scores.firebaseapp.com",
  databaseURL: "https://live-game-scores.firebaseio.com",
  projectId: "live-game-scores",
  storageBucket: "live-game-scores.appspot.com",
  messagingSenderId: "522976937579"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    AddPlayerModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    AddPlayerModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
