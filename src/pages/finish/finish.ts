import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';

import { CompetitorService } from '../../services/competitor.service';
import { Competitor } from '../../services/competitor';
import { FinishService } from '../../services/finish.service';

import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

//PubNub
import { PubNubAngular } from 'pubnub-angular2';

declare var google;

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html'
})
export class FinishPage {

  items: Array<Competitor>;
  competitors: Array<Competitor> = [];
  finishlist: Array<any> = [];

  options : GeolocationOptions;
  currentPos : Geoposition;

   private timer: any;
   private sub: Subscription;


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;

  constructor(
  	public navCtrl: NavController,
    public competitorService: CompetitorService,
  	public finishService: FinishService,
    private geolocation: Geolocation,
    private pubnubService: PubNubAngular
   ) {

    console.log("WILL NOW INIT PUBNUB!!!!");
    pubnubService.init({
      publishKey: 'pub-c-b06ac705-6638-4946-af1f-da17d43c519e',
      subscribeKey: 'sub-c-f2672bfe-a75e-11e7-ad87-6e294738eb45',
    });
    console.log("INIT DONE!!");

  }

  data: any;
  errorMessage: any;

  ngOnInit() {
    this.getCompetitors();
    this.timer = Observable.timer(5000,5000);  
    this.sub = this.timer.subscribe(() => this.changeMarkerPosition());
  }

  changeMarkerPosition() {

    this.geolocation.getCurrentPosition().then((pos : Geoposition) => {

        this.currentPos = pos;     

        console.log(pos);
        var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
        this.marker.setPosition(latlng);

        //send it through PubNub
    console.log("Going to send a message!!");
    this.pubnubService.publish(
    {
        message: {such: 'Hello!'},
        channel: 'races-1'
    },
    (status, response) => {
        if (status.error) {
            console.log(status);
        } else {
            console.log('message Published w/ timetoken', response.timetoken);
        }
    }
);
    console.log("The message has been sent!");

        
      },(err : PositionError)=>{
        console.log("error : " + err.message);
      ;
      })
    }

  getUserPosition(){
    this.options = {
    enableHighAccuracy : true,
    maximumAge : 0
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     

        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
}

ionViewDidEnter() {
  this.getUserPosition();
}   

addMap(lat,long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

}

addMarker(){

    this.marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(this.marker, 'click', () => {
    infoWindow.open(this.map, this.marker);
    });

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
  	console.log(this.competitors);
  	console.log('here');
  	console.log(event);
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
