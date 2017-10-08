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

  public started_at: Date;
  public scheduled_for: Date;
  public currentTime;
  public ongoingFor;
  public aasm_state;

  constructor(
  	public navCtrl: NavController,
  	private raceService: RaceService,
    public storage: Storage
  ) {

  }

  ngOnInit() {    

    this.storage.get('selectedRaces').then((selectedRaces) => {
      this.selectedRaces = selectedRaces;
      console.log('selected race');
      console.log(this.selectedRaces[0]);
      this.started_at     = this.selectedRaces[0].started_at;
      this.scheduled_for = this.selectedRaces[0].scheduled_for;
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

   updateSelectedRaces() {
     console.log("NOW WE NEED TO UPDATE THE SELECTED RACES!!!");
     console.log("STARTED_AT: " + this.started_at);
     console.log("SCHEDULED_FOR: " + this.scheduled_for);
     console.log("ONGOINGFOR: " + this.ongoingFor);
     console.log("AASM_STATE: " + this.aasm_state);

     this.selectedRaces[0].started_at = this.started_at;
     this.updateRace(this.selectedRaces[0]);
   }

   updateRace(race) {
       this.raceService.updateRace(race)
        .subscribe(
          response => console.log(response),
          error => this.errorMessage = <any>error
        );
   } 

   changeState(state) {
     console.log(state);
     console.log(this.selectedRaces[0]);
     console.log('--------------------------------------------');
     this.selectedRaces[0].aasm_state = state;
     this.updateRace(this.selectedRaces[0]);
   }

}
