import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)
export class ErrorService {
  message$ = new BehaviorSubject<string>('');
  timeout: number = 0;

  error(message: string) {
    this.message$.next(message);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.message$.next(''), 5000) as unknown as number;
  }
}
