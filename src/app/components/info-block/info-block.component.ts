import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss']
})
export class InfoBlockComponent implements OnInit {
  @Input() icon:string;
  @Input() value:string;
  @Input() subtitle:string;
  @Input() iconColorClass:string;
  @Input() valueState: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
