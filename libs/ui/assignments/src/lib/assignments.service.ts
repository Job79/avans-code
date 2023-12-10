import {Injectable} from "@angular/core";
import {IAssignment, ICreateAssignment, IUpdateAssignment} from "@avans-code/shared/domain";
import {Observable, of, switchMap, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Environment} from "@avans-code/ui/env";

@Injectable({providedIn: 'root'})
export class AssignmentsService {
  private fetched = false
  private cache: IAssignment[] = []

  constructor(private http: HttpClient) {
  }

  public assignments(): Observable<IAssignment[]> {
    if (this.fetched) {
      return of<IAssignment[]>(this.cache)
    }

    return this.http.get<IAssignment[]>(Environment.api.url + '/assignments')
      .pipe(
        tap(data => {
          this.fetched = true
          this.cache = data
        })
      )
  }

  public assignment(id: string): Observable<IAssignment> {
    if (this.fetched) {
      const assignment = this.cache.find(u => u._id === id)
      return assignment ? of<IAssignment>(assignment) : throwError('Assignment not found')
    }

    return this.http.get<IAssignment>(Environment.api.url + '/assignments/' + id)
  }

  public create(assignment: ICreateAssignment): Observable<IAssignment> {
    return this.http.post<IAssignment>(Environment.api.url + '/assignments', assignment)
      .pipe(tap(data => {
        this.cache.push(data)
      }))
  }

  public update(id: string, assignment: IUpdateAssignment): Observable<IAssignment> {
    return this.http.put<IAssignment>(Environment.api.url + '/assignments/' + id, assignment)
      .pipe(tap(data => {
        const idx = this.cache.findIndex(u => u._id === id)
        this.cache[idx] = data
      }))
  }

  public delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(Environment.api.url + '/assignments/' + id)
      .pipe(tap(() => {
        this.cache = this.cache.filter(u => u._id !== id)
      }))
  }

  search(query: string): Observable<IAssignment[]> {
    if (!this.fetched) {
      return this.assignments().pipe(switchMap(() => this.search(query)))
    }

    return of<IAssignment[]>(this.cache.filter(assignment => assignment.name.toLowerCase().includes(query.toLowerCase())))
  }
}
