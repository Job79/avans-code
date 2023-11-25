import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Assignment} from "@avans-code/shared/domain";
import {ActivatedRoute} from "@angular/router";
import {AssignmentsService} from "../assignments.service";

@Component({
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  assignment$!: Observable<Assignment>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly assignmentService: AssignmentsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.assignment$ = this.assignmentService.assignment(id)
  }
}
