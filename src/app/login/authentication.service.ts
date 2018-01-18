import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { InterceptorService } from 'ng2-interceptors';
@Injectable()
export class AuthenticationService {
    constructor(private http: Http
        , private interceptor: InterceptorService
    ) { }

    login(username: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new RequestOptions({
            method: 'POST',
            headers: headers,
            body:{ Username: username, Password: password }
        });
        return this.http.request('http://localhost:57210/api/Login',options )
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    login2(username: string, password: string) {
        // let headers = new Headers();
        // headers.append('Accept', 'application/json');
        // headers.append('Content-Type', 'application/json');
        // var options = new RequestOptions({
        //     method: "POST",
        //     body: { Username: username, Password: password },
        //     headers: headers
        // })
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.interceptor.post('http://localhost:57210/api/Login',{ Username: username, Password: password }, options)
        return this.interceptor.request('http://localhost:57210/api/Login', options);
    }
}