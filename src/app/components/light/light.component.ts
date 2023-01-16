import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.sass']
})
export class LightComponent implements OnInit {

  @Input() index: number = 0;
  @Input() color: string = 'white';
  @Input() time: number = 1;
  @Input() orderSubject?: Subject<string>;
  @Output() lightOff: EventEmitter<number> = new EventEmitter<number>()

  public onSignal = false;

  constructor(
  ) { }

  public turnOn() {
    this.onSignal = true;
    setTimeout(
      () => {
        this.turnOff();
      }, this.time * 1000)
  }

  public turnOff() {
    this.lightOff.emit(this.index);
    this.onSignal = false;
  }

  ngOnInit(): void {
    this.orderSubject?.subscribe(
      index => {
        console.log('index: ', index);
        if (+index === this.index)
          this.turnOn();


      }
    )
  }

}
