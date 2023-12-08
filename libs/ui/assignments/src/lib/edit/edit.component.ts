import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {faFloppyDisk, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {AssignmentsService} from "../assignments.service";
import {TagsService} from "../tags.service";
import {IAssignment, Niveaus, ITag} from "@avans-code/shared/domain";

@Component({
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  icon = {
    faTrashCan: faTrashCan,
    faFloppyDisk: faFloppyDisk
  }

  options: {niveaus: typeof Niveaus, tags: ITag[]} = {
    niveaus: Niveaus,
    tags: []
  }

  assignment: IAssignment = {
    _id: "",
    name: "",
    description: "",
    isPublic: false,
    niveau: 'beginner',
    programmingLanguage: "",
    tags: [],
    templateCode: "",
    testCode: "",
    version: 1
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly assignmentService: AssignmentsService,
    private readonly tagsService: TagsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    if (id) {
      this.assignmentService.assignment(id).subscribe((assignment) => this.assignment = {...assignment})
    }

    this.tagsService.tags().subscribe((tags) => {
      this.options.tags = tags

      // Use references from tags to show tags as selected
      this.assignment.tags = this.assignment.tags.map(t => tags.find(tag => tag.name === t.name)!)
    })
  }

  save() {
    if (this.assignment._id === '') {
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
    this.assignmentService.delete(this.assignment._id).subscribe(
      () => window.history.back()
    )
  }
}
