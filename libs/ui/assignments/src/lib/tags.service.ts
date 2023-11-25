import {Injectable} from "@angular/core";
import { Tag } from "@avans-code/shared/domain";
import {Observable, of} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class TagsService {
  db: Tag[] = [
    {
      name: 'Programming 1',
      active: true
    },
    {
      name: 'Programming 2',
      active: true
    },
    {
      name: 'Programming 3',
      active: true
    },
    {
      name: 'Datastructures 1',
      active: true
    },
    {
      name: 'Datastructures 2',
      active: true
    },
    {
      name: 'Racket programming 1',
      active: false
    }
  ]

  public tags(): Observable<Tag[]> {
    return of<Tag[]>(this.db)
  }

  public create(tag: Tag): Observable<Tag> {
    this.db.push(tag)
    return of<Tag>(tag)
  }

  public update(tag: Tag): Observable<Tag> {
    const idx = this.db.findIndex(u => u.name === tag.name)
    this.db[idx] = tag
    return of<Tag>(tag)
  }

  public delete(name: string): Observable<boolean> {
    const idx = this.db.findIndex(u => u.name === name)
    this.db.splice(idx, 1)
    return of<boolean>(true)
  }

  public query(name: string): Observable<Tag[]> {
    return of<Tag[]>(this.db.filter(u => u.name.toLowerCase().includes(name.toLowerCase())))
  }
}
