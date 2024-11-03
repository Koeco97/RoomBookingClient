import {Component, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {FormsModule} from "@angular/forms";
import {NgFor} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css',
})
export class EditBookingComponent implements OnInit{

  booking!: Booking;
  rooms!: Array<Room>
  layouts: (keyof typeof Layout)[] = Object.keys(Layout) as (keyof typeof Layout)[];
  layoutEnum = Layout;
  users!: Array<User>;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );
    this.dataService.getUsers().subscribe(
      next => this.users = next
    );

    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getBooking(+id).subscribe(
        next =>
          this.booking = next
      )
    } else {
      this.booking = new Booking();
    }
  }

  onSubmit(){
    if(this.booking.id != null) {
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    } else {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }
  }

}
