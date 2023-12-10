import {Component, OnInit} from '@angular/core';
import {AssignmentsService} from "../assignments.service";
import {Observable} from "rxjs";
import {faPencil, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {IAssignment} from "@avans-code/shared/domain";
import {AuthService} from "@avans-code/ui/auth";

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  icon = {
    faPlus: faPlus,
    faPencil: faPencil,
    faSearch: faSearch
  }
  assignments$!: Observable<IAssignment[]>
  user$ = this.authService.user$
  query = ''

  constructor(
    private authService: AuthService,
    private assignmentService: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.assignments$ = this.assignmentService.assignments()
  }

  search() {
    this.assignments$ = this.assignmentService.search(this.query)
  }
}
