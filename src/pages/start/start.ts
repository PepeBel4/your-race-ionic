import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  settingsPage = SettingsPage;

  constructor(public navCtrl: NavController) {

  }

  navigateSettings(){
  	console.log("WE ARE HERE!!!!!!");
  this.navCtrl.push(SettingsPage);
}

}
