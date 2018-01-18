import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../dashboard/dashboard.service";
import { Router } from '@angular/router'

@Component({
  selector: 'details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    details: any;

    constructor(
        private dashboardService: DashboardService,
        private router: Router
    ) {}

    ngOnInit() {
        this.details = this.dashboardService.selectedItem;
    }

    goBack() {
        this.dashboardService.selectedItem = null;
        this.router.navigateByUrl("/dashboard")
    }


    
}