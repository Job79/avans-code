import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AssignmentsService} from "../assignments.service";
import {IAssignment, ISolution} from "@avans-code/shared/domain";
import {SolutionsService} from "../solutions.service";
import {AuthService} from "@avans-code/ui/auth";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  icon = {
    faTrashCan: faTrashCan
  }

  assignment$!: Observable<IAssignment>
  user$ = this.authService.user$
  solutions: ISolution[] = []
  solutionCode = '';
  canSeeSolutions = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private assignmentService: AssignmentsService,
    private solutionsService: SolutionsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.assignment$ = this.assignmentService.assignment(id)
    this.loadSolutions()
  }

  loadSolutions() {
    const id = this.route.snapshot.paramMap.get('id')!
    if (this.user$.value.isLoggedIn) {
      this.solutionsService.solutions(id)
        .subscribe((solutions) => {
          const userId = this.user$.value._id
          this.canSeeSolutions = solutions.some((solution) => solution.owner._id === userId) || this.user$.value.role !== 'student'
          this.solutions = solutions
        })
    }
  }

  submitSolution() {
    if (!this.solutionCode) {
      return
    }

    const id = this.route.snapshot.paramMap.get('id')!
    this.solutionsService.create(id, {code: this.solutionCode})
      .subscribe(() => this.loadSolutions())
  }

  deleteSolution(solutionId: string) {
    const id = this.route.snapshot.paramMap.get('id')!
    this.solutionsService.delete(id, solutionId)
      .subscribe(() => this.loadSolutions())
  }
}
