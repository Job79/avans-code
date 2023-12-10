import {Injectable} from "@angular/core";
import {ICreateUser, IUpdateUser, IUser} from "@avans-code/shared/domain";
import {Observable, of, switchMap, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Environment} from "@avans-code/ui/env";

@Injectable({providedIn: 'root'})
export class UsersService {
  private fetched = false
  private cache: IUser[] = []

  constructor(private http: HttpClient) {
  }

  public users(): Observable<IUser[]> {
    if (this.fetched) {
      return of<IUser[]>(this.cache)
    }

    return this.http.get<IUser[]>(Environment.api.url + '/users')
      .pipe(
        tap(data => {
          this.fetched = true
          this.cache = data
        })
      )
  }

  public user(id: string): Observable<IUser> {
    if (this.fetched) {
      const user = this.cache.find(u => u._id === id)
      return user ? of<IUser>(user) : throwError('User not found')
    }

    return this.http.get<IUser>(Environment.api.url + '/users/' + id)
  }

  public create(user: ICreateUser): Observable<IUser> {
    return this.http.post<IUser>(Environment.api.url + '/users', user)
      .pipe(tap(data => {
        this.cache.push(data)
      }))
  }

  public update(id: string, user: IUpdateUser): Observable<IUser> {
    return this.http.put<IUser>(Environment.api.url + '/users/' + id, user)
      .pipe(tap(data => {
        const idx = this.cache.findIndex(u => u._id === id)
        this.cache[idx] = data
      }))
  }

  public delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(Environment.api.url + '/users/' + id)
      .pipe(tap(() => {
        this.cache = this.cache.filter(u => u._id !== id)
      }))
  }

  search(query: string): Observable<IUser[]> {
    if (!this.fetched) {
      return this.users().pipe(switchMap(() => this.search(query)))
    }

    return of<IUser[]>(this.cache.filter(user => user.email.toLowerCase().includes(query.toLowerCase())))
  }
}
