import {Injectable} from "@angular/core";
import {User} from "@avans-code/shared/domain";
import {Observable, of, throwError} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class UserService {
  users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      password: '123456',
      role: 'teacher'
    },
    {
      id: '3',
      name: 'John Dodo',
      email: 'john.dodo@gmail.com',
      password: '123456',
      role: 'student'
    },
    {
      id: '4',
      name: 'Jane Dodo',
      email: 'jane.dodo@gmail.com',
      password: '123456',
      role: 'student'
    },
    {
      id: '5',
      name: 'John Dedodo',
      email: 'john.dedodo@gmail.com',
      password: '123456',
      role: 'student'
    }
  ]

  constructor() {
  }

  public Users(): Observable<User[]> {
    return of<User[]>(this.users)
  }

  public User(id: string): Observable<User> {
    const user = this.users.find(user => user.id === id)
    if (user) {
      return of<User>(user)
    }
    return throwError(() => new Error('User not found'))
  }

  public Create(user: User): Observable<User> {
    user.id = (this.users.length + 1).toString()
    this.users.push(user)
    return of<User>(user)
  }

  public Update(user: User): Observable<User> {
    const idx = this.users.findIndex(u => u.id === user.id)
    this.users[idx] = user
    return of<User>(user)
  }

  public Delete(id: string): Observable<boolean> {
    const idx = this.users.findIndex(u => u.id === id)
    this.users.splice(idx, 1)
    return of<boolean>(true)
  }
}
