import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FinishService } from '../../services/finish.service';

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
  	public finishService: FinishService) {
  }

  data: any;
  errorMessage: any;



  ngOnInit() {
    this.setItems();
  }

  setItems() {
    this.org_items = [{id:1, number:'BEL4'},{id:2, number:'FRA4'}];
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

  doClick(input,finish) {
  	console.log('clickEvent');
  	console.log(finish);
  	this.finishlist.push({number: finish.number, timestamp: new Date().toISOString()});
  	input.value = null;
  	this.items = [];
  	input.setFocus();
  	this.doWork();
  }

  doWork() {
  	console.log(finish);
  	for(let finish of this.finishlist) {
  		this.finishService.registerFinish(finish).subscribe(
    		finish => this.finishRegistered(finish),
    		error => this.errorMessage = <any>error
    	);;
  	}
  }

  finishRegistered(finish) {
  	console.log('correct. Taking it off');
  	this.errorMessage = 'OKIDO';
  }

  doChange(event) {
  	console.log(event);
  	this.items = this.org_items.filter(item => item.number.indexOf(event.value) >= 0);
  }


}
