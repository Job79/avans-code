import { Component } from '@angular/core';
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'avans-code-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  icon = {faRightToBracket: faRightToBracket}
  hidden = true
}
