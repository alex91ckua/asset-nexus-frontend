import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { KeyValue } from '@angular/common';

import * as Tablesort from 'tablesort';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() parties: string;
  @Input() headers: string[];
  el = document.getElementById('partiesTable');
  @ViewChild('partiesTable') partiesTable: ElementRef;

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.sort()
  }

  sort() {
    new Tablesort(this.partiesTable.nativeElement);
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }




}
