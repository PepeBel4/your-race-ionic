import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { RaceInfoPage } from '../pages/raceinfo/raceinfo';
import { StartPage } from '../pages/start/start';
import { FinishPage } from '../pages/finish/finish';
import { WeatherPage } from '../pages/weather/weather';
import { SettingsPage } from '../pages/settings/settings';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';

import { CompetitionService } from '../services/competition.service';
import { RaceService } from '../services/race.service';

import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus'
import { TwitterConnect } from '@ionic-native/twitter-connect'

// diretives and providers
import { Loader } from '../providers/loader';
import { Nl2br } from '../pipes/nl2br';
import { AuthenticatorService } from '../providers/authenticator';

// Authentication
import { LoginPage } from '../pages/authentication/login/login';
import { RegistrationPage } from '../pages/authentication/registration/registration';


import { Config } from './config'

@NgModule({
  declarations: [
    MyApp,
    RaceInfoPage,
    StartPage,
    FinishPage,
    WeatherPage,
    SettingsPage,
    TabsPage,
    LoginPage,
    RegistrationPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(Config.FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RaceInfoPage,
    StartPage,
    FinishPage,
    WeatherPage,
    SettingsPage,
    TabsPage,
    LoginPage,
    RegistrationPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CompetitionService,
    RaceService,
    Loader,
    Facebook,
    GooglePlus,
    TwitterConnect,
    AngularFireAuth,
    AngularFireDatabase,
    AuthenticatorService
  ]
})
export class AppModule {}
