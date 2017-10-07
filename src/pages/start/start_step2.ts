import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

import { RaceService } from '../../services/race.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-start-step2',
  templateUrl: 'start_step2.html'
})

export class StartStep2Page implements OnInit {

  settingsPage = SettingsPage;

  public selectedRaces;

  public data: any[];
  errorMessage: string;
  private timer: any;
  private sub: Subscription;

  public startTime;
  public currentTime;

  constructor(
  	public navCtrl: NavController,
  	private raceService: RaceService,
    public storage: Storage
  ) {

  }

  ngOnInit() {    

    this.storage.get('selectedRaces').then((selectedRaces) => {
      this.selectedRaces = selectedRaces;
      console.log(this.selectedRaces[0]);

      this.startTime = this.selectedRaces[0].scheduled_for;
    });

		this.timer = Observable.timer(0,1000);  
		this.sub = this.timer.subscribe(() => this.updateData());   
    
    }

  updateData(){
  	this.currentTime = new Date().toISOString();
    if (this.selectedRaces != null &&  this.selectedRaces[0].ongoingFor) this.selectedRaces[0].ongoingFor += 1;
  }

  getRacesOpen() {
    	this.raceService.getRacesOpen()
    		.subscribe(
    			races => this.data = races,
    			error => this.errorMessage = <any>error
    		);
   }

}
