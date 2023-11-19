import {Injectable} from "@angular/core";
import {User} from "@avans-code/shared/domain";
import {Observable, of, throwError} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class UserService {
  db: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/1/200',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/2/200',
      role: 'teacher'
    },
    {
      id: '3',
      name: 'John Dodo',
      email: 'john.dodo@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/3/200',
      role: 'student'
    },
    {
      id: '4',
      name: 'Jane Dodo',
      email: 'jane.dodo@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/4/200',
      role: 'student'
    },
    {
      id: '5',
      name: 'John Dedodo',
      email: 'john.dedodo@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/5/200',
      role: 'student'
    }
  ]

  constructor() {
  }

  public users(): Observable<User[]> {
    return of<User[]>(this.db)
  }

  public user(id: string): Observable<User> {
    const user = this.db.find(user => user.id === id)
    if (user) {
      return of<User>(user)
    }
    return throwError(() => new Error('User not found'))
  }

  public create(user: User): Observable<User> {
    user.id = (this.db.length + 1).toString()
    this.db.push(user)
    return of<User>(user)
  }

  public update(user: User): Observable<User> {
    const idx = this.db.findIndex(u => u.id === user.id)
    this.db[idx] = user
    return of<User>(user)
  }

  public delete(id: string): Observable<boolean> {
    const idx = this.db.findIndex(u => u.id === id)
    this.db.splice(idx, 1)
    return of<boolean>(true)
  }

  search(query: string) {
    return of<User[]>(this.db.filter(user => user.name.toLowerCase().includes(query.toLowerCase())))
  }
}
