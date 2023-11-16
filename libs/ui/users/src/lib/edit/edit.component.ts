import {Component, OnInit} from '@angular/core';
import {User} from "@avans-code/shared/domain";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/UserService";
import {faFloppyDisk, faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'avans-code-edit',
  templateUrl: './edit.component.html',
  styles: [],
})
export class EditComponent implements OnInit {
  icon = {
    faTrashCan: faTrashCan,
    faFloppyDisk: faFloppyDisk
  }

  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'student'
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    if (id) {
      this.userService.User(id).subscribe((user) => this.user = {...user})
      return
    }
  }

  save() {
    if (this.user.id === '') {
      this.userService.Create(this.user).subscribe(
        () => window.history.back()
      )
      return
    }

    this.userService.Update(this.user).subscribe(
      () => window.history.back()
    )
  }

  delete() {
    this.userService.Delete(this.user.id).subscribe(
      () => window.history.back()
    )
  }
}
