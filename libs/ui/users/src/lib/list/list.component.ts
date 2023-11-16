import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/UserService";
import {User} from "@avans-code/shared/domain";
import {Observable} from "rxjs";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'avans-code-list',
  templateUrl: './list.component.html',
  styleUrls: [],
})
export class ListComponent implements OnInit {
  icon = { faPlus: faPlus, faEdit: faEdit }
  users!: Observable<User[]>

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.Users()
  }
}