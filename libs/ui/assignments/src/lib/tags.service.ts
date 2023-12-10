import {Injectable} from "@angular/core";
import {ITag} from "@avans-code/shared/domain";
import {map, Observable, of, tap} from "rxjs";
import {Environment} from "@avans-code/ui/env";
import {HttpClient} from "@angular/common/http";

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
          this.cache = data.filter(tag => tag.isActive)
        }),
        map(() => this.cache)
      )
  }
}
