import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDetailComponent} from "./user-detail/user-detail.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf,
    UserDetailComponent,
    NgIf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users!: Array<User>;
  selectedUser?: User;


  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      next => {
        this.users = next;
      }
    );
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        const foundUser = this.users.find(user => user.id === +id); // +id - convert string to a number
        if (foundUser) {
          this.selectedUser = foundUser;
        } else {
          console.warn(`User with id ${id} not found.`);
        }
      }
    });  }


  setUser(id: number){
    this.router.navigate(['admin','users'], {queryParams : {id: id}})
  }

}
