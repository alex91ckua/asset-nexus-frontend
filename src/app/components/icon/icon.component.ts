import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() id:string;
  @Input() classList:string [] = [];

  get classnames(): string {
    return this.classList.join(' ');
  }

}
