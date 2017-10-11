import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Competitor } from './competitor';

@Injectable()
export class CompetitorService {
	private competitionsUrl = 'http://localhost:3001/';
	competitor: Competitor;

	constructor(
		private http: Http
	) {}

	getCompetitors(): Observable<Competitor[]> {

		return this.http.get(this.competitionsUrl + 'competitions/1/competitors')
						.map((response: Response) => <Competitor[]>response.json())
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