import {Injectable} from "@angular/core";
import {Assignment} from "@avans-code/shared/domain";
import {Observable, of, throwError} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class AssignmentsService {
  db: Assignment[] = [
    {
      id: '1',
      name: 'Assignment 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      programmingLanguage: 'Java',
      templateCode: 'public class Main {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello, World!");\n' +
        '    }\n' +
        '}',
      testCode: '',
      version: 1,
      timestamp: new Date(),
      niveau: 'beginner',
      tags: [
        {
          name: 'Programming 1',
          active: true
        }
      ],
      owner: {
        id: '1',
        name: 'John Doe'
      }
    },
    {
      id: '2',
      name: 'Assignment 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      programmingLanguage: 'Java',
      templateCode: 'public class Main {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello, World!");\n' +
        '    }\n' +
        '}',
      testCode: '',
      version: 1,
      timestamp: new Date(),
      niveau: 'beginner',
      tags: [
        {
          name: 'Programming 1',
          active: true
        }
      ],
      owner: {
        id: '1',
        name: 'John Doe'
      }
    },
    {
      id: '3',
      name: 'Assignment 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      programmingLanguage: 'Java',
      templateCode: 'public class Main {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello, World!");\n' +
        '    }\n' +
        '}',
      testCode: '',
      version: 1,
      timestamp: new Date(),
      niveau: 'beginner',
      tags: [
        {
          name: 'Programming 1',
          active: true
        }
      ],
      owner: {
        id: '1',
        name: 'John Doe'
      }
    },
    {
      id: '4',
      name: 'Assignment 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      programmingLanguage: 'Java',
      templateCode: 'public class Main {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello, World!");\n' +
        '    }\n' +
        '}',
      testCode: '',
      version: 1,
      timestamp: new Date(),
      niveau: 'intermediate',
      tags: [
        {
          name: 'Programming 1',
          active: true
        }
      ],
      owner: {
        id: '1',
        name: 'John Doe'
      }
    },
    {
      id: '5',
      name: 'Assignment 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      programmingLanguage: 'Java',
      templateCode: 'public class Main {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello, World!");\n' +
        '    }\n' +
        '}',
      testCode: '',
      version: 2,
      timestamp: new Date(),
      niveau: 'intermediate',
      tags: [
        {
          name: 'Programming 1',
          active: true
        }
      ],
      owner: {
        id: '1',
        name: 'John Doe'
      }
    }
  ]

  public assignments(): Observable<Assignment[]> {
    return of<Assignment[]>(this.db)
  }

  public assignment(id: string): Observable<Assignment> {
    const assignment = this.db.find(assignment => assignment.id === id)
    if (assignment) {
      return of<Assignment>(assignment)
    }
    return throwError(() => new Error('Assignment not found'))
  }

  public create(assignment: Assignment): Observable<Assignment> {
    assignment.id = (this.db.length + 1).toString()
    this.db.push(assignment)
    return of<Assignment>(assignment)
  }

  public update(assignment: Assignment): Observable<Assignment> {
    const idx = this.db.findIndex(u => u.id === assignment.id)
    assignment.version++
    this.db[idx] = assignment
    return of<Assignment>(assignment)
  }

  public delete(id: string): Observable<boolean> {
    const idx = this.db.findIndex(u => u.id === id)
    this.db.splice(idx, 1)
    return of<boolean>(true)
  }

  search(query: string) {
    return of<Assignment[]>(this.db.filter(assignment => assignment.name.toLowerCase().includes(query.toLowerCase())))
  }
}
