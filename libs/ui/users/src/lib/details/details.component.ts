import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "@avans-code/shared/domain";
import {UsersService} from "../users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  user$!: Observable<IUser>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UsersService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.user$ = this.userService.user(id)
  }
}
