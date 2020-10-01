import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  headers = ["id", "type", "value", "date"];
  parties = [
    {
      "id": "Zurich",
      "type": "Insurance",
      "value": "£120k",
      "date": "04/03/1992",
    },
    {
      "id": "Beagle Street",
      "type": "Insurance",
      "value": "£200k",
      "date": "12/08/2002",
    },
    {
      "id": "Danske",
      "type": "Debt",
      "value": "£40k",
      "date": "24/01/2015",
    },
    {
      "id": "12a Ballymacormick Rd",
      "type": "Mortgage",
      "value": "£180k",
      "date": "21/06/2018",
    },
    {
      "id": "LV",
      "type": "Asset",
      "value": "£70k",
      "date": "17/11/1998",
    },
    {
      "id": "34 Mallon Rd",
      "type": "Mortgage",
      "value": "£500k",
      "date": "19/02/1972",
    },
  ]

  metric_block_data = [
    { "value": "3", "subtitle": "Debts", "icon": "calendar", "iconColorClass": "icon-color-brand" },
    { "value": "12", "subtitle": "Assets", "icon": "check", "iconColorClass": "icon-color-brand" },
    { "value": "4", "subtitle": "Insurance Policies", "icon": "will", "iconColorClass": "icon-color-brand" },
    { "value": "£180k", "subtitle": "Current Net Value", "icon": "check", "iconColorClass": "icon-color-brand" },
    { "value": "£120k", "subtitle": "Post Death Net Value", "icon": "check", "iconColorClass": "icon-color-brand" },
    { "value": "£10k", "subtitle": "Total debt", "icon": "ban", "iconColorClass": "icon-color-brand" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
