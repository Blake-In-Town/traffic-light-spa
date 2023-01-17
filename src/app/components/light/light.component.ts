import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.sass']
})
export class LightComponent implements OnInit {

  @Input() id?: string;
  @Input() color: string = 'white';
  @Input() time: number = 1;
  @Input() orderSubject?: Subject<string>;
  @Output() lightOff: EventEmitter<string> = new EventEmitter<string>()

  public onSignal = false;

  constructor(
  ) { }

  public turnOn() {
    this.onSignal = true;
    console.log('this.onSignal: ', this.onSignal);
    setTimeout(
      () => {
        this.turnOff();
      }, this.time * 1000)
  }

  public turnOff() {
    this.lightOff.emit(this.id);
    this.onSignal = false;
  }

  ngOnInit(): void {
    this.orderSubject?.subscribe(
      id => {
        console.log('index: ', id);
        if (id === this.id)
          this.turnOn();
      }
    )
  };

  ngOnDestroy(): void {
    this.orderSubject?.unsubscribe();
  }

}
