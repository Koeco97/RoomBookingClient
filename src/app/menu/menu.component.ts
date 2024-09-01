import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  constructor(private router: Router) {
  }

  navigateToRoomsAdmin(){
    this.router.navigate(['admin','rooms'])
  }

  navigateToUsersAdmin(){
    this.router.navigate(['admin','users'])
  }

  navigateToHome(){
    this.router.navigate([''])
  }
}
