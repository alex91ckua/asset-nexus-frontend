import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-selector-button',
  templateUrl: './selector-button.component.html',
  styleUrls: ['./selector-button.component.scss']
})
export class SelectorButtonComponent implements OnInit {

  @Input() dataset = []
  @Input() Selection: string;
  @Output() selectorOpacityClick = new EventEmitter();
  selectorOpacity = 0.8;
  isActive;
  clickedItem;
  selectorValue ='Please select an item';

  // Data
  data;
  displayPath;
  dataGroup =  'Assets';
  dataBranch = 'Property';
  buttonDataset;
  
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof this.Selection === 'string') {
      this.displayPath = this.Selection.split('/');
      this.dataGroup =  this.displayPath[0];
      this.dataBranch = this.displayPath[1];
    } else {
      this.dataGroup = 'Assets';
      this.dataBranch = 'Property';
    }

    this.buttonDataset = this.dataset[this.dataGroup][0][this.dataBranch];    

    this.dataset[this.dataGroup][0][this.dataBranch].map(displayGroupItems => {
      displayGroupItems.key = displayGroupItems.key;
      displayGroupItems.currentValue = displayGroupItems.values[displayGroupItems.values.length - 1].value;
      displayGroupItems.opacity = 1;
    })

  }

  selectorClick(item){

    this.dataset[this.dataGroup][0][this.dataBranch].map(displayGroupItems => {

      if (displayGroupItems.key == item && displayGroupItems.opacity == 1) {
        displayGroupItems.opacity = 0;
      } else if  (displayGroupItems.key == item && displayGroupItems.opacity == 0) {
        displayGroupItems.opacity = 1;
      }

    })

    // emitting opacity into the data object and passing it back to parent
    this.selectorOpacityClick.emit(this.dataset)
  }


  



  
}
