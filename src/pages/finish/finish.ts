import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html'
})
export class FinishPage {

  orig_items: Array<string>;
  items: Array<string>;

  constructor(public navCtrl: NavController) {
  }


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
  	console.log("IS CLICKED!!");
  	console.log(event);
  	event.value = null;
  	this.items = [];
  	event.setFocus();
  }

  doChange(event) {
  	console.log("CHANGE DETECTED");
  	console.log(event.value);
  	this.items = this.org_items.filter(item => item.indexOf(event.value) >= 0);
  }


}
