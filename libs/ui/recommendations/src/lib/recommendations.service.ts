import {Injectable} from "@angular/core";
import {IAssignment} from "@avans-code/shared/domain";
import {Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Environment} from "@avans-code/ui/env";

@Injectable({providedIn: 'root'})
export class RecommendationsService {
  private fetched = false
  private cache: IAssignment[] = []

  constructor(private http: HttpClient) {
  }

  public recommendations(): Observable<IAssignment[]> {
    if (this.fetched) {
      return of<IAssignment[]>(this.cache)
    }

    return this.http.get<IAssignment[]>(Environment.api.url + '/recommendations')
      .pipe(
        tap(data => {
          this.fetched = true
          this.cache = data
        })
      )
  }
}
