import {Injectable} from "@angular/core";
import {IAssignment, ICreateSolution, ISolution} from "@avans-code/shared/domain";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Environment} from "@avans-code/ui/env";

@Injectable({providedIn: 'root'})
export class SolutionsService {
  constructor(private http: HttpClient) {
  }

  public solutions(assignmentId: string): Observable<ISolution[]> {
    return this.http.get<ISolution[]>(Environment.api.url + '/assignments/' + assignmentId + '/solutions')
  }

  public create(assignmentId: string, solution: ICreateSolution): Observable<IAssignment> {
    return this.http.post<IAssignment>(Environment.api.url + '/assignments/' + assignmentId + '/solutions', solution)
  }

  delete(assignmentId: string, solutionId: string) {
    return this.http.delete(Environment.api.url + '/assignments/' + assignmentId + '/solutions/' + solutionId)
  }
}
