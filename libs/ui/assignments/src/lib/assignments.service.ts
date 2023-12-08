import {Injectable} from "@angular/core";
import {IAssignment} from "@avans-code/shared/domain";
import {Observable, of, throwError} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class AssignmentsService {
  cache: IAssignment[] = []

  public assignments(): Observable<IAssignment[]> {
    return of<IAssignment[]>(this.cache)
  }

  public assignment(id: string): Observable<IAssignment> {
    const assignment = this.cache.find(assignment => assignment._id === id)
    if (assignment) {
      return of<IAssignment>(assignment)
    }
    return throwError(() => new Error('Assignment not found'))
  }

  public create(assignment: IAssignment): Observable<IAssignment> {

    assignment._id = (this.cache.length + 1).toString()
    this.cache.push(assignment)
    return of<IAssignment>(assignment)
  }

  public update(assignment: IAssignment): Observable<IAssignment> {
    const idx = this.cache.findIndex(u => u._id === assignment._id)
    assignment.version++
    this.cache[idx] = assignment
    return of<IAssignment>(assignment)
  }

  public delete(id: string): Observable<boolean> {
    const idx = this.cache.findIndex(u => u._id === id)
    this.cache.splice(idx, 1)
    return of<boolean>(true)
  }

  search(query: string) {
    return of<IAssignment[]>(this.cache.filter(assignment => assignment.name.toLowerCase().includes(query.toLowerCase())))
  }
}
