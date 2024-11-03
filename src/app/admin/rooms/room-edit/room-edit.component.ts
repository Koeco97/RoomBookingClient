import {Component, Input, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit{

  @Input()
  room!: Room;

  layouts: (keyof typeof Layout)[] = Object.keys(Layout) as (keyof typeof Layout)[];
  layoutEnum = Layout;

  roomForm = new FormGroup<{
    roomName: FormControl<string | null>;
    location: FormControl<string | null>;
    [key: string]: AbstractControl<any>; // This allows for dynamic keys
  }>({
    roomName: new FormControl('roomName'),
    location: new FormControl('location')
  });

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName: this.room.name,
      location: this.room.location
    });

    for (const layout of this.layouts){
      this.roomForm.addControl(`layout${layout}`, new FormControl(`layout${layout}`))
    }
  }

  onSubmit(){
    this.room.name = this.roomForm.controls['roomName'].value ?? 'default'; //
    this.room.location = this.roomForm.value['location'] ?? 'default';
    this.room.capacities = new Array<LayoutCapacity>()
    for(const layout of this.layouts){
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity)
    }

    console.log(this.room);
    // call a method in a data service to save the room
  }

}
