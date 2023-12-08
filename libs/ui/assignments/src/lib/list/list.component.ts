import {Component, OnInit} from '@angular/core';
import {AssignmentsService} from "../assignments.service";
import {Observable} from "rxjs";
import {faPencil, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {IAssignment} from "@avans-code/shared/domain";

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
  query = ''

  constructor(private readonly assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.assignments$ = this.assignmentService.assignments()
  }

  search() {
    this.assignments$ = this.assignmentService.search(this.query)
  }
}
