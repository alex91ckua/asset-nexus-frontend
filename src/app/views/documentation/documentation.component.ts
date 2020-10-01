import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  headers = ["id", "role", "email", "phone", "signed up", "last signed in"]
  parties = [
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phone": "07345345513",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "../../assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phone": "07927453455",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phone": "079279345343",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phone": "07345345513",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phone": "07927453455",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phone": "079279345343",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0001",
      "name": "Gavin",
      "avatar": "assets/avatars/Gavin.png",
      "role": "Trusted advisor",
      "email": "gavin@gmail.com",
      "phone": "07345345513",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0002",
      "name": "Roger",
      "avatar": "assets/avatars/Gavin.png",
      "role": "Executor",
      "email": "roger@gmail.com",
      "phone": "07927453455",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
    {
      "id": "0003",
      "name": "Andrew",
      "avatar": "assets/avatars/Gavin.png",
      "role": "Beneficiary",
      "email": "andrew@gmail.com",
      "phone": "079279345343",
      "signed up": true,
      "last signed in": "04/03/2020"
    },
  ]

  willData = [
    {
      "name": 'Will 1',
      "link": '../../../assets/will-1.pdf', 
    },
    {
      "name": 'Will 2',
      "link": '../../../assets/will-2.pdf', 
    },
    {
      "name": 'Will 3',
      "link": '../../../assets/will-3.pdf', 
    }
  ]

  metric_block_data = [
    { "value": "1", "subtitle": "Executor", "icon": "mail", "iconColorClass": "icon-color-brand" },
    { "value": "3", "subtitle": "Trustees", "icon": "energy", "iconColorClass": "icon-color-brand" },
    { "value": "4", "subtitle": "Trusted Friends", "icon": "fingerprint", "iconColorClass": "icon-color-brand" },
  ]

  public selctorClickedEvent: Event;

  constructor() { }

  ngOnInit(): void {
  }

  childEventClicked(event) {
    this.selctorClickedEvent = event;
  }


}
