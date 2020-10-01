import { Component, OnInit } from '@angular/core';
import data from './../../../datastore/linechartData.json';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timelineData = data;
  public selctorClickedEvent: Event;
  public opacityClickedEvent: Event;

  constructor() { }

  ngOnInit(): void {
  }

  childEventClicked(event) {
    this.selctorClickedEvent = event;
  }

  selectorOpacityClicked(event) {
    this.opacityClickedEvent = {...event}; // spread operator to pass changes to values within an object (rather than a change to the object itself)
  }

}
