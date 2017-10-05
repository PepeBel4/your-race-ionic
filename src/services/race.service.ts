import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Race } from './race';

@Injectable()
export class RaceService {
	private apiUrl = 'http://localhost:3001/';

	constructor(
		private http: Http
	) {}

	getRacesOpen(): Observable<Race[]> {

		return this.http.get(this.apiUrl + 'races/open')
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