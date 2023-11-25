import {Component, OnInit} from '@angular/core';
import {Assignment, Niveaus} from "@avans-code/shared/domain";
import {ActivatedRoute} from "@angular/router";
import {faFloppyDisk, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {AssignmentsService} from "../assignments.service";

@Component({
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  icon = {
    faTrashCan: faTrashCan,
    faFloppyDisk: faFloppyDisk
  }

  options = {
    niveaus: Niveaus
  }

  assignment: Assignment = {
    id: "",
    name: "",
    description: "",
    niveau: 'beginner',
    programmingLanguage: "",
    tags: [],
    templateCode: "",
    testCode: "",
    version: 1
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly assignmentService: AssignmentsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    if (id) {
      this.assignmentService.assignment(id).subscribe((assignment) => this.assignment = {...assignment})
      return
    }
  }

  save() {
    if (this.assignment.id === '') {
      this.assignmentService.create(this.assignment).subscribe(
        () => window.history.back()
      )
      return
    }

    this.assignmentService.update(this.assignment).subscribe(
      () => window.history.back()
    )
  }

  delete() {
    this.assignmentService.delete(this.assignment.id).subscribe(
      () => window.history.back()
    )
  }
}
