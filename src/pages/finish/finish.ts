import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RaceService } from '../../services/race.service';

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html'
})
export class FinishPage {

  orig_items: Array<string>;
  items: Array<string>;

  finishlist: Array<string> = [];

  constructor(
  	public navCtrl: NavController,
  	public raceService: RaceService) {
  }

  data: any;
  errorMessage: any;



  ngOnInit() {
    this.setItems();
  }

  setItems() {
    this.org_items = ['BEL4', 'BEL77', 'BEL99', 'FRA1', 'FRA4', 'ISR9', 'ISR7', 'JPN1', 'POL4', 'ISR45', 'BEL45'];
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  doClick(event) {
  	this.finishlist.push({number: event.value, timestamp: new Date().toISOString()});
  	event.value = null;
  	this.items = [];
  	event.setFocus();
  	this.doWork();
  }

  doWork() {
  	console.log('background http call');
  	for(let finish of this.finishlist) {
  		this.raceService.updateRace(finish).subscribe(
    		races => this.data = races,
    		error => this.errorMessage = <any>error
    	);;
  	}
  	console.log('done');
  }

  doChange(event) {
  	this.items = this.org_items.filter(item => item.indexOf(event.value) >= 0);
  }


}
