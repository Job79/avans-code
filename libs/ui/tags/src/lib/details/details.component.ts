import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ITag} from "@avans-code/shared/domain";
import {ActivatedRoute} from "@angular/router";
import {TagsService} from "../tags.service";

@Component({
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  tag$!: Observable<ITag>

  constructor(
    private route: ActivatedRoute,
    private tagsService: TagsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.tag$ = this.tagsService.tag(id)
  }
}
