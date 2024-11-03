import {Component, OnInit} from '@angular/core';
import {DatePipe, formatDate, NgForOf, NgIf} from "@angular/common";
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{

  bookings!: Array<Booking>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      next => this.bookings = next
    )
  }


}
