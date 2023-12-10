import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Environment} from "@avans-code/ui/env";
import {IRole} from "@avans-code/shared/domain";

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {
  user$ = new BehaviorSubject({
    isLoggedIn: false,
    _id: '',
    name: '',
    role: null as null | IRole,
    token: ''
  })

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.token) {
      this.user$.next(user)
    }
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ _id: string, name: string, role: IRole, token: string }>(Environment.api.url + '/auth/login', {
      email,
      password
    })
      .pipe(
        tap(user => {
          this.user$.next({...user, isLoggedIn: true})
          localStorage.setItem('user', JSON.stringify({...user, isLoggedIn: true}))
        })
      )
  }

  logout() {
    localStorage.removeItem('user')
    this.user$.next({
      isLoggedIn: false,
      _id: '',
      name: '',
      role: null,
      token: ''
    })
  }
}
