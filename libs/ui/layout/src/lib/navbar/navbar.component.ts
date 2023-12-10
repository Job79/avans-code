import {Component} from '@angular/core';
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "@avans-code/ui/auth";

@Component({
  selector: 'avans-code-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  icon = {faRightToBracket: faRightToBracket}
  hidden = true
  user$ = this.authService.user$

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout()
  }
}
