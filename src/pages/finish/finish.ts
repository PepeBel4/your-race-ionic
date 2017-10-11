import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CompetitorService } from '../../services/competitor.service';
import { FinishService } from '../../services/finish.service';

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html'
})
export class FinishPage {

  items: Array<Competitor>;
  competitors: Array<Competitor> = [];
  finishlist: Array<string> = [];

  constructor(
  	public navCtrl: NavController,
    public competitorService: CompetitorService,
  	public finishService: FinishService) {
  }

  data: any;
  errorMessage: any;

  ngOnInit() {
    this.getCompetitors();
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

  doClick(input,competitor) {
  	this.finishlist.push({id: competitor.id, timestamp: new Date().toISOString()});
  	input.value = null;
  	this.items = [];
  	input.setFocus();
  	this.doWork();
  }

  doWork() {
    for(let finish of this.finishlist) {
      this.finishService.registerFinish(finish).subscribe(
    		answer => this.finishRegistered(finish,answer),
    		error => this.errorMessage = <any>error
    	);;
  	}
  }

  finishRegistered(finish, answer) {
    console.log(answer);
    this.data = answer;
    this.finishlist = this.finishlist.filter(item => item.id != finish.id);
    this.errorMessage = 'OKIDO';
    console.log(this.finishlist);
  }

  doChange(event) {
    	this.items = this.competitors.filter(item => item.number.indexOf(event.value) >= 0);
  }

  getCompetitors() {
    this.competitorService.getCompetitors()
        .subscribe(
          competitors => this.competitors = competitors,
          error => this.errorMessage = <any>error
        );
  }

}
