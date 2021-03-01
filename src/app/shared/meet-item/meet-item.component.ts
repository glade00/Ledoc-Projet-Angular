import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meet-item',
  templateUrl: './meet-item.component.html',
  styleUrls: ['./meet-item.component.scss']
})
export class MeetItemComponent implements OnInit {

  @Input() meet = {
    id: '',
    date: '',
    patient: {
      lastName: '',
      firstName: '',
    },
    subject: ''
  };

  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
