import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import data from '../../../datastore/linechartData.json';

@Component({
  selector: 'app-select-will',
  templateUrl: './select-will.component.html',
  styleUrls: ['./select-will.component.scss']
})
export class SelectWillComponent implements OnInit {

  @Input() ChartData: any;
  @Output() selectboxValueSelected = new EventEmitter();
  selectboxValue = 'Please select an item';
  items: any;

  selectbox_items = [];

  constructor() {}

  filter(){
    this.selectboxValueSelected.emit(this.selectboxValue)
  }

  ngOnInit(): void {
    this.items = ( this.ChartData );
  }

}
