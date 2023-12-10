import {Component, OnInit} from '@angular/core';
import {RecommendationsService} from "../recommendations.service";
import {Observable} from "rxjs";
import {IAssignment} from "@avans-code/shared/domain";
import {AuthService} from "@avans-code/ui/auth";

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  assignments$!: Observable<IAssignment[]>
  query = ''

  constructor(
    private authService: AuthService,
    private recommendationsService: RecommendationsService
  ) {}

  ngOnInit(): void {
    this.assignments$ = this.recommendationsService.recommendations()
  }
}
