import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class DashboardService { 

    constructor(private http: Http, private interceptor: InterceptorService) { }

    getWorkItems() {
        return this.http.get('http://localhost:81/MockAPI/values').map(res => res.json());
    }
}
