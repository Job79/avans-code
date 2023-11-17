import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "@avans-code/shared/domain";
import {UserService} from "../../service/UserService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'avans-code-details',
  templateUrl: './details.component.html',
  styleUrls: [],
})
export class DetailsComponent implements OnInit {
  user$!: Observable<User>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.user$ = this.userService.user(id)
  }
}
