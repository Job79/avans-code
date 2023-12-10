import {Component, OnInit} from '@angular/core';
import {ICreateUser, IUpdateUser, IUser, Roles} from "@avans-code/shared/domain";
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

  user: IUser = {
    _id: '',
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
    }
  }

  save() {
    const body = {...this.user} as Partial<IUser>
    delete body._id

    if (this.user._id === '') {
      this.userService.create(body as ICreateUser).subscribe(() => window.history.back())
      return
    }

    this.userService.update(this.user._id, body as IUpdateUser).subscribe( () => window.history.back())
  }

  delete() {
    this.userService.delete(this.user._id)
      .subscribe(() => window.history.back())
  }
}
