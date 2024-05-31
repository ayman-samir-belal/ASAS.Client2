import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoaoding = new BehaviorSubject(false);
  constructor() { }

  show() {
    this.isLoaoding.next(true);
  }

  hide() {
    this.isLoaoding.next(false);
  }
}
