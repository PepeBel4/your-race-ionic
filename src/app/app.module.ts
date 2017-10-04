import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

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

@NgModule({
  declarations: [
    MyApp,
    RaceInfoPage,
    StartPage,
    FinishPage,
    WeatherPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RaceInfoPage,
    StartPage,
    FinishPage,
    WeatherPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CompetitionService,
    RaceService
  ]
})
export class AppModule {}
