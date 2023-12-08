import {Injectable} from "@angular/core";
import { ITag } from "@avans-code/shared/domain";
import {Observable, of} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class TagsService {
  db: ITag[] = []

  public tags(): Observable<ITag[]> {
    return of<ITag[]>(this.db)
  }

  public create(tag: ITag): Observable<ITag> {
    this.db.push(tag)
    return of<ITag>(tag)
  }

  public update(tag: ITag): Observable<ITag> {
    const idx = this.db.findIndex(u => u.name === tag.name)
    this.db[idx] = tag
    return of<ITag>(tag)
  }

  public delete(name: string): Observable<boolean> {
    const idx = this.db.findIndex(u => u.name === name)
    this.db.splice(idx, 1)
    return of<boolean>(true)
  }

  public query(name: string): Observable<ITag[]> {
    return of<ITag[]>(this.db.filter(u => u.name.toLowerCase().includes(name.toLowerCase())))
  }
}
