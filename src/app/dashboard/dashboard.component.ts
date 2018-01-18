import { Component, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { Router } from '@angular/router'

@Component({
    selector: 'dashboard-component',
    styleUrls: ["./dashboard.component.scss"],
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    developmentWorkItems = []; // vegetables
    rodWorkItems = []; // fruits
    roaWorkItems = []; // names
    droppedFruits = [];
    droppedVegetables = [];
    droppedItems = [];
    fruitDropEnabled = true;
    dragEnabled = true;
    workItems: any = {};
    constructor(
        private dashboardService: DashboardService,
        private router: Router
    ) 
        { }

    ngOnInit() {
        this.dashboardService.getWorkItems().subscribe(res => {
            console.log(res);
            res.value.map(it => {
                it.type = it.fields["System.BoardColumn"];
                it.title = it.fields['System.Title'];
                it.assignee = it.fields['System.AssignedTo'];
                it.points = it.fields['Microsoft.VSTS.Scheduling.StoryPoints'];
                it.description = it.fields['System.Description'];
                it.acceptanceCriteria = it.fields['Microsoft.VSTS.Common.AcceptanceCriteria'];
            });
            this.workItems = res.value;
            this.rodWorkItems = this.workItems.filter(wi => wi.type == "Ready for Development");
            this.developmentWorkItems = this.workItems.filter(wi => wi.type == "Development");
            this.roaWorkItems = this.workItems.filter(wi => wi.type == "Ready for Approval");
        },
            err => {
                console.log(err);
            });
    }

    onDropItem(e: any) {
        var data = e.nativeEvent.currentTarget.getAttribute("data");
        var sourceType = e.dragData.type;
        if (data == "rodWorkItems") {
            e.dragData.type = "Ready for Development";
            this.rodWorkItems.push(e.dragData);
        }
        else if (data == "developmentWorkItems") {
            e.dragData.type = "Development";
            this.developmentWorkItems.push(e.dragData);
        }
        else if (data == "roaWorkItems") {
            e.dragData.type = "Ready for Approval";
            this.roaWorkItems.push(e.dragData);
        }

        switch (sourceType) {
            case "Ready for Development":
                this.rodWorkItems = this.removeItem(e.dragData, this.rodWorkItems);
                break;
            case "Development":
                this.developmentWorkItems = this.removeItem(e.dragData, this.developmentWorkItems);
                break;
            case "Ready for Approval":
                this.roaWorkItems = this.removeItem(e.dragData, this.roaWorkItems);
                break;
        }


    }

    removeItem(item: any, list) {
        return list.filter(ele => ele.id != item.id);
    }

    titleClicked(item) {
        this.dashboardService.selectedItem = item;
        this.router.navigateByUrl("/details");
    }
}


