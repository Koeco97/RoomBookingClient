import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-room-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit, OnDestroy{

  @Input()
  room!: Room;

  layouts: (keyof typeof Layout)[] = Object.keys(Layout) as (keyof typeof Layout)[];
  layoutEnum = Layout;

  roomForm!: FormGroup;

  resetEventSubscription!: Subscription;

  constructor(private  formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {}


  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    );
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  initializeForm(): void {

    console.log('running ngOnInit')
    this.roomForm = this.formBuilder.group(
      {
        roomName : [this.room.name, Validators.required],
        location : [this.room.location, [Validators.required, Validators.minLength(2)]],
      }
    )

    for (const layout of this.layouts){
      const  layoutCapacity = this.room.capacities.find(lc => lc.layout === Layout[layout]);
      const initialCapacity = layoutCapacity ? layoutCapacity.capacity : 0;
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
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

    if(this.room.id == null) {
      this.dataService.addRoom(this.room).subscribe(
        next => {
          this.router.navigate(['admin','rooms'], {queryParams: {action: 'view', id : next.id}});
        }
      );
    } else {
      this.dataService.updateRoom(this.room).subscribe(
        next => {
          this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});
        }
      );
    }
  }

}
