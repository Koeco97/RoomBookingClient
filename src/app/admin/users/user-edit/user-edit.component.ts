import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{

  @Input()
  user!: User;

  formUser!: User

  message?: String;

  password!: String;

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formUser = {...this.user}; // creates a shallow copy of this.user
  }

  onSubmit() {
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}})
        }
      )
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}})
        }
      )
    }
  }
}
