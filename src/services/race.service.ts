import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Race } from './race';

@Injectable()
export class RaceService  {
	private apiUrl = 'http://localhost:3001/';
	private timer: any;
  	private sub: Subscription;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) {}


    getRacesOpen(): Observable<Race[]> {

    	console.log("GETTING THE RACES!!!!!!!!!");

		return this.authHttp.get(this.apiUrl + 'races/open')
						.map((response: Response) => <Race[]>response.json())
						.catch(this.handleError);
	}

	updateRace(race) {
		console.log('will now update the race too');
		console.log(race);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		console.log(JSON.stringify(race));
		return this.authHttp.patch(this.apiUrl + 'races/' + race.id, JSON.stringify(race), {
			headers: headers}).map((res: Response) => res.json());
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}