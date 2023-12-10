import {Component, OnInit} from '@angular/core';
import {ITag} from "@avans-code/shared/domain";
import {Observable} from "rxjs";
import {faPencil, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {TagsService} from "../tags.service";

@Component({
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  icon = {
    faPlus: faPlus,
    faPencil: faPencil,
    faSearch: faSearch
  }
  tags$!: Observable<ITag[]>
  query = ''

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tags$ = this.tagsService.tags()
  }

  search() {
    this.tags$ = this.tagsService.search(this.query)
  }
}
