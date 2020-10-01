import { Component, OnInit } from '@angular/core';
import data from './../../../datastore/sunburst.json';
import A_Data from './../../../datastore/Asset_Data.json';
import D_Data from './../../../datastore/Debt_Data.json';
import I_Data from './../../../datastore/Insurance_Data.json';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  sunburst_NetPresentValue = data;
  Asset_Data = A_Data;
  Debt_Data = D_Data;
  Insurance_Data = I_Data;

  status: boolean = false;

  dateNow = new Date();
  today: string;
  dd = this.dateNow.getDate();
  mm = this.dateNow.getMonth()+1; 
  yyyy = this.dateNow.getFullYear();
    
  metric_block_data = [
    { "value": "180k", "subtitle": "Asset Total", "icon": "check", "iconColorClass": "icon-color-brand" },
    { "value": "-123k", "subtitle": "Debt Total", "icon": "ban", "iconColorClass": "icon-color-brand" },
    { "value": "57k", "subtitle": "Current NPV", "icon": "will", "iconColorClass": "icon-color-brand" },
    { "value": "157k", "subtitle": "Insurance Total", "icon": "will", "iconColorClass": "icon-color-brand" },
  ]


  constructor() { }

  ngOnInit(): void {
    this.today = `${this.dd}/${this.mm}/${this.yyyy}`;
    console.log(this.today);
  }

}
