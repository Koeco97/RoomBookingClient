import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

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
export class UserEditComponent implements OnInit, OnDestroy{

  @Input()
  user!: User;

  formUser!: User

  message?: String;

  password!: String;
  password2!: String;

  nameIsValid = false;
  passwordsAreValid = false;
  passwordsMatch = false;

  userResetSubscription!: Subscription;

  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.userResetSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    )
  }

  ngOnDestroy(): void {
    this.userResetSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.formUser = {...this.user}; // creates a shallow copy of this.user
    this.checkIfNameIsValid();
    this.checkIfPasswordsAreValid()
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

  checkIfNameIsValid() {
    if(this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordsAreValid() {
    if (this.formUser.id != null){
      this.passwordsAreValid = true;
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = this.password === this.password2;
      if (this.password) {
        this.passwordsAreValid = this.password.trim().length > 0;
      } else {
        this.passwordsAreValid = false;
      }
    }
  }
}
