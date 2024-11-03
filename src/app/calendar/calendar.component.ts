import {Component, OnInit} from '@angular/core';
import {DatePipe, formatDate} from "@angular/common";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent{

  selectedDate = new Date()

}
