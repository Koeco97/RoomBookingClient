import {Component, Input} from '@angular/core';
import {Room} from "../../../model/Room";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {

  @Input()
  room!: Room;

  constructor(private router: Router) {
  }

  editRoom(){
    this.router.navigate(['admin','rooms'], {queryParams: {action: 'edit', id:this.room.id}})
  }
}
