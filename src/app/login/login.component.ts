import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "./authentication.service";

@Component({
    selector: 'login-component',
    styleUrls: ["./login.component.scss"],
	templateUrl: './login.component.html'
})

export class LoginComponent {
    model: any = {};
    loading = false;
    returnUrl: string = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = "dashboard";
    }

    login() {
        this.loading = true;
        this.authenticationService.login2(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
					this.router.navigate([this.returnUrl]);
                    this.loading = false;
                });
    }
}
