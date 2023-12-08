import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AssignmentsService} from "../assignments.service";
import {IAssignment} from "@avans-code/shared/domain";

@Component({
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  assignment$!: Observable<IAssignment>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly assignmentService: AssignmentsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.assignment$ = this.assignmentService.assignment(id)
  }
}
