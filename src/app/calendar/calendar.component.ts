import {Component, OnInit} from '@angular/core';
import {DatePipe, formatDate, NgForOf, NgIf} from "@angular/common";
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

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

  constructor(private dataService: DataService,
              private router: Router) {}

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      next => this.bookings = next
    )
  }

  editBooking(id: number){
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  addBooking(){
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number){
    this.dataService.deleteBooking(id).subscribe();
  }

}
