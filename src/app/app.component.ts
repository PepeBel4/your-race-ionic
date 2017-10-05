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

      // Verify if user is logged in
      this.auth.authState.subscribe(user => {
        if (user) {
          console.info("Authenticated - pushing menu");
          authenticatorService.setUser(user);
          this.rootPage = TabsPage;
        } else {
          console.info("User not logged in");
          authenticatorService.invalidateUser();
          this.rootPage = LoginPage;
        }
      });

      // Available events for Authentication
      this.events.subscribe('user:login', user => {
        console.info("This was trigger by the user:login event.");
      });

      this.events.subscribe('user:create', user => {
        console.info("This was trigger by the user:create event.");
      });

      this.events.subscribe('user:resetPassword', user => {
        console.info("This was trigger by the user:resetPassword event.");
      });







    });
  }
}
