import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/UserService";
import {User} from "@avans-code/shared/domain";
import {Observable} from "rxjs";

@Component({
  selector: 'avans-code-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [],
})
export class UsersListComponent implements OnInit {
  users!: Observable<User[]>

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.Users()
    // this.userService.Users().subscribe((users: User[]) => {
    //   this.users = users
    // })
  }
}
