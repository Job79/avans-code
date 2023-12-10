import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {faFloppyDisk, faToggleOff, faToggleOn, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {AssignmentsService} from "../assignments.service";
import {TagsService} from "../tags.service";
import {IAssignment, Niveaus, ITag, ICreateAssignment, IUpdateAssignment} from "@avans-code/shared/domain";
import {AuthService} from "@avans-code/ui/auth";

@Component({
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  icon = {
    faTrashCan: faTrashCan,
    faFloppyDisk: faFloppyDisk,
    faToggleOn: faToggleOn,
    faToggleOff: faToggleOff
  }

  options: {niveaus: typeof Niveaus, tags: ITag[]} = {
    niveaus: Niveaus,
    tags: []
  }

  assignment: Partial<IAssignment> = {
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
    private authService: AuthService,
    private route: ActivatedRoute,
    private assignmentService: AssignmentsService,
    private tagsService: TagsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    if (id) {
      this.assignmentService.assignment(id).subscribe((assignment) => {
        if (assignment.owner._id !== this.authService.user$.value._id && this.authService.user$.value.role !== 'admin'){
          window.history.back();
        }

        this.assignment = {...assignment}
      })
    }

    this.tagsService.tags().subscribe((tags) => {
      this.options.tags = tags

      // Use references from tags to show tags as selected
      this.assignment.tags = this.assignment.tags?.map(t => tags.find(tag => tag.name === t.name)!)
    })
  }

  save() {
    const body = {...this.assignment} as Partial<IAssignment>
    delete body._id

    if (this.assignment._id === '') {
      this.assignmentService.create(body as ICreateAssignment)
        .subscribe(() => window.history.back())
      return
    }

    this.assignmentService.update(this.assignment._id!, body as IUpdateAssignment)
      .subscribe(() => window.history.back())
  }

  delete() {
    this.assignmentService.delete(this.assignment._id!)
      .subscribe(() => window.history.back())
  }
}
