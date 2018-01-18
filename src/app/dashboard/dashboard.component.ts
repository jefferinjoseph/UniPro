import { Component, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";

@Component({
    selector: 'dashboard-component',
    styleUrls: ["./dashboard.component.scss"],
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    title = 'Test Component testing commits hello again';
    vegetables = [
        { name: 'Carrot', type: 'vegetable', workItemID: 1 },
        { name: 'Onion', type: 'vegetable', workItemID: 2 },
        { name: 'Potato', type: 'vegetable', workItemID: 3 },
        { name: 'Capsicum', type: 'vegetable', workItemID: 4 }
    ];
    fruits = [
        { name: 'Apple', type: 'fruits', workItemID: 5 },
        { name: 'Orange', type: 'fruits', workItemID: 6 },
        { name: 'Grapes', type: 'fruits', workItemID: 7 },
        { name: 'Pineapple', type: 'fruits', workItemID: 8 }
    ];
    names = [
        {name: "Aswin", type: "name", workItemID: 9},
        {name: "Jefferin", type: "name", workItemID: 10},
        {name: "Taffy", type: "name", workItemID: 11},
        {name: "Deepak", type: "name", workItemID: 12},
        {name: "Shoby", type: "name", workItemID: 13},
        {name: "Venki", type: "name", workItemID: 14},
        {name: "Saleem", type: "name", workItemID: 15}
    ]
    droppedFruits = [];
    droppedVegetables = [];
    droppedItems = [];
    fruitDropEnabled = true;
    dragEnabled = true;
    workItems: any = {};
    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getWorkItems().subscribe(res => {
            this.workItems = res;
            console.log(res);
        },
        err => console.log(err));
    }

    onDropItem(e: any) {
        var data = e.nativeEvent.currentTarget.getAttribute("data");
        var sourceType = e.dragData.type;
        if (data == "fruits"){
            e.dragData.type = "fruits";
            this.fruits.push(e.dragData);
        }
        else if (data == "vegetables"){
            e.dragData.type = "vegetable";
            this.vegetables.push(e.dragData);
        }
        else if (data == "names"){
            e.dragData.type = "name";
            this.names.push(e.dragData);
        }

        switch (sourceType) {
            case "fruits": 
                this.fruits = this.removeItem(e.dragData, this.fruits);
                break;
            case "vegetable":
                this.vegetables = this.removeItem(e.dragData, this.vegetables);
                break;
            case "name": 
                this.names = this.removeItem(e.dragData, this.names);
                break;
        }
        
       
    }

    removeItem(item: any, list) {
        return list.filter(ele => ele.workItemID != item.workItemID);
    }
}


