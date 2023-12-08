import {Injectable} from "@angular/core";
import {IUser} from "@avans-code/shared/domain";
import {Observable, of, throwError} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class UsersService {
  db: IUser[] = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/1/200',
      role: 'admin'
    },
    {
      _id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/2/200',
      role: 'teacher'
    },
    {
      _id: '3',
      name: 'John Dodo',
      email: 'john.dodo@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/3/200',
      role: 'student'
    },
    {
      _id: '4',
      name: 'Jane Dodo',
      email: 'jane.dodo@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/4/200',
      role: 'student'
    },
    {
      _id: '5',
      name: 'John Dedodo',
      email: 'john.dedodo@gmail.com',
      password: '12345678',
      profileUrl: 'https://picsum.photos/id/5/200',
      role: 'student'
    }
  ]

  constructor() {
  }

  public users(): Observable<IUser[]> {
    return of<IUser[]>(this.db)
  }

  public user(id: string): Observable<IUser> {
    const user = this.db.find(user => user._id === id)
    if (user) {
      return of<IUser>(user)
    }
    return throwError(() => new Error('User not found'))
  }

  public create(user: IUser): Observable<IUser> {
    user._id = (this.db.length + 1).toString()
    this.db.push(user)
    return of<IUser>(user)
  }

  public update(user: IUser): Observable<IUser> {
    const idx = this.db.findIndex(u => u._id === user._id)
    this.db[idx] = user
    return of<IUser>(user)
  }

  public delete(id: string): Observable<boolean> {
    const idx = this.db.findIndex(u => u._id === id)
    this.db.splice(idx, 1)
    return of<boolean>(true)
  }

  search(query: string) {
    return of<IUser[]>(this.db.filter(user => user.name.toLowerCase().includes(query.toLowerCase())))
  }
}
