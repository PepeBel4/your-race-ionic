import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
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