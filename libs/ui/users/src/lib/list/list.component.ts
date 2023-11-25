import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {User} from "@avans-code/shared/domain";
import {Observable} from "rxjs";
import {faPencil, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  icon = {
    faPlus: faPlus,
    faPencil: faPencil,
    faSearch: faSearch
  }
  users$!: Observable<User[]>
  query = ''

  constructor(private readonly userService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.userService.users()
  }

  search() {
    this.users$ = this.userService.search(this.query)
  }
}
