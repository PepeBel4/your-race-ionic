import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Race } from '../../services/race';
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

  public race: Race = {};

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
      this.race = selectedRaces[0];
      console.log('the STATE');
      console.log(this.race.aasm_state);
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
     this.selectedRaces[0].started_at = this.race.started_at;
     this.selectedRaces[0].scheduled_for = this.race.scheduled_for;
     this.selectedRaces[0].aasm_state = this.race.aasm_state;
     this.selectedRaces[0].individual_recall = this.race.individual_recall;
     this.updateRace(this.selectedRaces[0]);
   }

   updateRace(race) {
       this.raceService.updateRace(race)
        .subscribe(
          response => console.log(response),
          error => this.errorMessage = <any>error
        );
   } 

   changeState() {
     this.updateSelectedRaces();
   }

}
