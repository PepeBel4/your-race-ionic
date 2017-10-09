import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class FinishService  {
	private apiUrl = 'http://localhost:3001/';
	private timer: any;
  	private sub: Subscription;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) {}


	registerFinish(finish) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		console.log(JSON.stringify(finish));
		return this.authHttp.post(this.apiUrl + 'finishes/register', JSON.stringify(finish), {
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