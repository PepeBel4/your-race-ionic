import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

import { StartStep2Page } from './start_step2';

import { RaceService } from '../../services/race.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {

  public data: any[];
  errorMessage: string;
  private timer: any;
  private sub: Subscription;

  private selectedRaces;

  startFormBuilder: any;

  constructor(
  	public navCtrl: NavController,
  	private raceService: RaceService,
    public storage: Storage
  ) {

  }

  ionViewWillEnter() {
    this.getRacesOpen();  
    this.selectedRaces = [];
    this.storage.set('selectedRaces', this.selectedRaces); 
  }

  navigateStep2(){
  	this.navCtrl.push(StartStep2Page);
  }

  getRacesOpen() {

    	this.raceService.getRacesOpen()
    		.subscribe(
    			races => this.data = races,
    			error => this.errorMessage = <any>error
    		);
   }

   doSomething(id) {
     console.log('I am doing something for race ' + id);
   }

   notify(race, event) {
     if (event.checked) this.selectedRaces.push(race);
     else {
       var index = this.selectedRaces.indexOf(race, 0);
       if (index > -1) this.selectedRaces.splice(index, 1);
     }
     this.storage.set('selectedRaces', this.selectedRaces);
   }

}
