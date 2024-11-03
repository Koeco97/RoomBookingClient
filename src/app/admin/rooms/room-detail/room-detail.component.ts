import {Component, Input} from '@angular/core';
import {Room} from "../../../model/Room";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

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

  constructor(private router: Router,
              private dataService: DataService) {
  }

  editRoom(){
    this.router.navigate(['admin','rooms'], {queryParams: {action: 'edit', id:this.room.id}})
  }

  deleteRoom(){
    this.dataService.deleteRoom(this.room.id).subscribe(
      next => this.router.navigate(['admin', 'rooms'])
    )
  }
}
