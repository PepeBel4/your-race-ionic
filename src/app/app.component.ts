import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireAuth } from 'angularfire2/auth';

// Authenticator
import { AuthenticatorService } from '../providers/authenticator';

// Root pages to be used based on authentication
import { LoginPage } from '../pages/authentication/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [AuthenticatorService]
})
export class MyApp {
  rootPage:any;
  // = TabsPage;

  constructor(
    platform: Platform, 
    private events: Events,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth: AngularFireAuth,
    private authenticatorService: AuthenticatorService

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.rootPage = TabsPage;






    });
  }
}
