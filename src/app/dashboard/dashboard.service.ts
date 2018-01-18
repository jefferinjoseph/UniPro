import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class DashboardService { 

    constructor(private http: InterceptorService) { }

    getWorkItems() {
        return this.req("GET", "http://localhost:12345/values").map(res => res.json());

    }

    req = function(method, url, body?, headers?) {
        if (!headers) {
          headers = new Headers();
          headers.append('Accept', 'application/json')
          headers.append('Content-Type', 'application/json')
          headers.append('Access-Control-Allow-Origin', "*")
        }
    
        var options = new RequestOptions({
          method: method,
          body: body,
          headers: headers
        })
    
        return this.http.request(url, options)
      }
}
