import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {NgFor, NgForOf, NgIf} from "@angular/common";
import {RoomDetailComponent} from "./room-detail/room-detail.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    NgFor,
    NgForOf,
    RoomDetailComponent,
    NgIf
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{

  rooms!: Array<Room>;
  selectedRoom?: Room;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next => {
        this.rooms = next;
      }
    );
    // this.route.snapshot.queryParams['id']; // accessing a specific param in a single way
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        const foundRoom = this.rooms.find(room => room.id === +id); // +id - convert string to a number
        if (foundRoom) {
          this.selectedRoom = foundRoom;
        } else {
          console.warn(`Room with id ${id} not found.`);
        }
      }
    });
  }

  setRoom(id: number){
    this.router.navigate(['admin','rooms'], {queryParams : {id: id}})
  }

}
