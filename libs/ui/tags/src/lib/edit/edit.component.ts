import {Component, OnInit} from '@angular/core';
import {ITag, ICreateTag, IUpdateTag} from "@avans-code/shared/domain";
import {ActivatedRoute} from "@angular/router";
import {faFloppyDisk, faToggleOff, faToggleOn, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {TagsService} from "../tags.service";

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

  tag: ITag = {
    _id: "",
    category: "",
    isActive: false,
    name: ""
  }

  constructor(
    private route: ActivatedRoute,
    private tagsService: TagsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    if (id) {
      this.tagsService.tag(id).subscribe((tag) => this.tag = {...tag})
    }
  }

  save() {
    const body = {...this.tag} as Partial<ITag>
    delete body._id

    if (this.tag._id === '') {
      this.tagsService.create(body as ICreateTag).subscribe(() => window.history.back())
      return
    }

    this.tagsService.update(this.tag._id, body as IUpdateTag).subscribe( () => window.history.back())
  }

  delete() {
    this.tagsService.delete(this.tag._id)
      .subscribe(() => window.history.back())
  }
}
