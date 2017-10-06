import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

import { RaceService } from '../../services/race.service';

@Component({
  selector: 'page-start-step2',
  templateUrl: 'start_step2.html'
})

export class StartStep2Page implements OnInit {

  settingsPage = SettingsPage;

  public data: any[];
  errorMessage: string;
  private timer: any;
  private sub: Subscription;

  constructor(
  	public navCtrl: NavController,
  	private raceService: RaceService
  ) {

  }

  ngOnInit() {    
		this.timer = Observable.timer(0,60000);  
		this.sub = this.timer.subscribe(() => this.getRacesOpen());   
    }

  updateData(){
  	console.log("WE ARE HERE!!!!!!");
  	//this.navCtrl.push(SettingsPage);
  }

  getRacesOpen() {
    	this.raceService.getRacesOpen()
    		.subscribe(
    			races => this.data = races,
    			error => this.errorMessage = <any>error
    		);
   }

}
