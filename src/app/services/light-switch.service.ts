import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightSwitchService {

  constructor() { }

  private switchOrder = '';
  private focusIndex = 0;
  private orderSubject$: Subject<string> = new Subject<string>();
  private subsription = this.orderSubject$.subscribe()

  public getOrder(str: string) {
    this.switchOrder = str;
    this.switchLight();
  };

  public getSubject(): Subject<string> {
    return this.orderSubject$;
  }

  public switchLight() {
    this.orderSubject$.next(this.switchOrder[this.focusIndex])
    if (this.focusIndex < this.switchOrder.length)
      ++this.focusIndex;
    else {
      this.focusIndex = 0;
    }
  }
}
