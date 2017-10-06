import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';

import { StartStep2Page } from './start_step2';

import { RaceService } from '../../services/race.service';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage implements OnInit {

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

}
