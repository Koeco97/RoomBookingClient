import { Injectable } from '@angular/core';
import {Layout, LayoutCapacity, Room} from './model/Room';
import {User} from './model/User';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room>;
  private users: Array<User>;


  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  updateUser(user: User) : Observable<User>{
    const  originalUser = this.users.find(u => u.id === user.id);
    if(originalUser) {
      originalUser.name = user.name;
      return of(originalUser)
    } else {
      throw new Error('User not found');
    }
  }

  addUser(newUser: User, password: String) : Observable<User>{
    let id = 0;
    for (const user of this.users) {
      if(user.id > id){
        id = user.id;
      }
    }
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser);
  }

  updateRoom(room: Room) : Observable<Room> {
    const originalRoom = this.rooms.find(r => r.id === room.id);
    if(originalRoom) {
      originalRoom.name = room.name;
      originalRoom.location = room.location;
      originalRoom.capacities = room.capacities;
      return of(originalRoom);
    } else {
      throw new Error('Room not found');
    }
  }

  addRoom(newRoom: Room) : Observable<Room>{
    let id = 0;
    for (const room of this.rooms) {
      if (room.id > id){
        id = room.id;
      }
    }
    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

  deleteRoom(id: number) : Observable<any>{
    const room = this.rooms.find(r => r.id === id);
    if(room) {
      this.rooms.splice(this.rooms.indexOf(room), 1);
      return of(null);
    } else {
      throw new Error('Room not found');
    }
  }

  deleteUser(id: number) : Observable<any>{
    const user = this.users.find(u => u.id === id);
    if(user) {
      this.users.splice(this.users.indexOf(user), 1);
      return of(null);
    } else {
      throw new Error('User not found');
    }
  }

  resetUserPassword(id: number) : Observable<any> {
    return of(null);
  }

  constructor() {
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.location = 'First Floor';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor';

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;

    room2.capacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);

    this.users = new Array<User>();

    const user1 = new User();
    user1.id = 1;
    user1.name = 'Matt';
    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';
    const user3 = new User();
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }
}
