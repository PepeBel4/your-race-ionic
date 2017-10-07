import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';

import { RaceService } from '../../services/race.service';

@Component({
  selector: 'page-raceinfo',
  templateUrl: 'raceinfo.html'
})
export class RaceInfoPage implements OnInit {

  public data: any[];
  errorMessage: string;
  private timer: any;
  private sub: Subscription;

  constructor(
  	public navCtrl: NavController,
  	private raceService: RaceService) 
  {}

  ngOnInit() {    
		this.timer = Observable.timer(2500,60000);  
		this.sub = this.timer.subscribe(() => this.getRacesOpen());   
    }

    ngOnDestroy(){
        console.log("Destroy timer");
        // unsubscribe here
        this.sub.unsubscribe();

    }

    getRacesOpen() {
    	this.raceService.getRacesOpen()
    		.subscribe(
    			races => this.data = races,
    			error => this.errorMessage = <any>error
    		);
    }

}
