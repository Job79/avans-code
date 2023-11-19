import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/UserService";
import {User} from "@avans-code/shared/domain";
import {Observable} from "rxjs";
import {faPencil, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'avans-code-list',
  templateUrl: './list.component.html',
  styleUrls: [],
})
export class ListComponent implements OnInit {
  icon = {
    faPlus: faPlus,
    faPencil: faPencil,
    faSearch: faSearch
  }
  users$!: Observable<User[]>
  query = ''

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.users()
  }

  search() {
    this.users$ = this.userService.search(this.query)
  }
}
