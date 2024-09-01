import {Component, Input} from '@angular/core';
import {User} from "../../../model/User";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  @Input()
  user!: User;

}
