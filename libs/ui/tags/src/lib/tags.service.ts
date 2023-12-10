import {Injectable} from "@angular/core";
import {ITag, ICreateTag, IUpdateTag} from "@avans-code/shared/domain";
import {Observable, of, switchMap, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Environment} from "@avans-code/ui/env";

@Injectable({providedIn: 'root'})
export class TagsService {
  private fetched = false
  private cache: ITag[] = []

  constructor(private http: HttpClient) {
  }

  public tags(): Observable<ITag[]> {
    if (this.fetched) {
      return of<ITag[]>(this.cache)
    }

    return this.http.get<ITag[]>(Environment.api.url + '/tags')
      .pipe(
        tap(data => {
          this.fetched = true
          this.cache = data
        })
      )
  }

  public tag(id: string): Observable<ITag> {
    if (this.fetched) {
      const tag = this.cache.find(u => u._id === id)
      return tag ? of<ITag>(tag) : throwError('Tag not found')
    }

    return this.http.get<ITag>(Environment.api.url + '/tags/' + id)
  }

  public create(tag: ICreateTag): Observable<ITag> {
    return this.http.post<ITag>(Environment.api.url + '/tags', tag)
      .pipe(tap(data => {
        this.cache.push(data)
      }))
  }

  public update(id: string, tag: IUpdateTag): Observable<ITag> {
    return this.http.put<ITag>(Environment.api.url + '/tags/' + id, tag)
      .pipe(tap(data => {
        const idx = this.cache.findIndex(u => u._id === id)
        this.cache[idx] = data
      }))
  }

  public delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(Environment.api.url + '/tags/' + id)
      .pipe(tap(() => {
        this.cache = this.cache.filter(u => u._id !== id)
      }))
  }

  search(query: string): Observable<ITag[]> {
    if (!this.fetched) {
      return this.tags().pipe(switchMap(() => this.search(query)))
    }

    return of<ITag[]>(this.cache.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase())))
  }
}
