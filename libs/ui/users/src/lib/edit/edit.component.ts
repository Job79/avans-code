import {Component, OnInit} from '@angular/core';
import {User, Roles} from "@avans-code/shared/domain";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../users.service";
import {faFloppyDisk, faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  icon = {
    faTrashCan: faTrashCan,
    faFloppyDisk: faFloppyDisk
  }

  options = {
    roles: Roles
  }

  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    profileUrl: '',
    role: 'student'
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UsersService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    if (id) {
      this.userService.user(id).subscribe((user) => this.user = {...user})
      return
    }
  }

  save() {
    if (this.user.id === '') {
      this.userService.create(this.user).subscribe(
        () => window.history.back()
      )
      return
    }

    this.userService.update(this.user).subscribe(
      () => window.history.back()
    )
  }

  delete() {
    this.userService.delete(this.user.id).subscribe(
      () => window.history.back()
    )
  }
}
