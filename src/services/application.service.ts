import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApplicationService {

	public selectedRaces: any[];

	constructor(
	) {}
}