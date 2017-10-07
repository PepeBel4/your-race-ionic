import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { RaceInfoPage } from '../pages/raceinfo/raceinfo';
import { StartPage } from '../pages/start/start';
import { StartStep2Page } from '../pages/start/start_step2';
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
import { AuthenticatorService } from '../providers/authenticator';

// Authentication
import { LoginPage } from '../pages/authentication/login/login';
import { RegistrationPage } from '../pages/authentication/registration/registration';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

import * as Raven from 'raven-js';

import { IonicStorageModule } from '@ionic/storage'
 
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

import { Config } from './config'

Raven
  .config('https://ca08b3ce0dc847c69307fa31feabceb7@sentry.io/226992')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    RaceInfoPage,
    StartPage,
    StartStep2Page,
    FinishPage,
    WeatherPage,
    SettingsPage,
    TabsPage,
    LoginPage,
    RegistrationPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(Config.FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RaceInfoPage,
    StartPage,
    StartStep2Page,
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
    AuthenticatorService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AppModule {}
