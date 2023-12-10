import {Component, OnInit} from '@angular/core';
import {faPencil, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../auth.service";
import {catchError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  icon = {
    faPlus: faPlus,
    faPencil: faPencil,
    faSearch: faSearch
  }

  user = {
    email: '',
    password: ''
  }

  showInvalidCredentialsError = false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if(user.isLoggedIn) {
        window.history.back()
      }
    })
  }

  login() {
    this.authService.login(this.user.email, this.user.password).pipe(
      catchError((err) => {
        this.showInvalidCredentialsError = true
        throw err
      })
    ).subscribe(() => window.history.back())
  }
}
