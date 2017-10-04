import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Competition } from './competition';

@Injectable()
export class CompetitionService {
	private competitionsUrl = 'http://localhost:3001/competitions/';
	competition: Competition;
	public competitionChange:Subject<Competition> = new Subject();

	constructor(
		private http: Http
	) {}

	getCompetitions(): Observable<Competition[]> {

		return this.http.get(this.competitionsUrl)
						.map((response: Response) => <Competition[]>response.json())
						.catch(this.handleError);
	}

	getCompetition(id: number) {
		return this.http.get(this.competitionsUrl + id);
	}

	setSelectedCompetition(competition: Competition) {
        this.competition = competition;
        console.log('setting it..');
        this.competitionChange.next(this.competition);
        console.log(this.competition);
    }

	createCompetition(competition) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.competitionsUrl, JSON.stringify(competition), {
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