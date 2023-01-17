import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LightSwitchService } from 'src/app/services/light-switch.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.sass']
})
export class LightComponent implements OnInit {

  @Input() id?: string;
  @Input() color: string = 'white';
  @Input() time: number = 1;

  private subscription?: Subscription;

  public onSignal = false;

  constructor(
    private orderSubject: LightSwitchService
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
    this.onSignal = false;
    this.orderSubject.switchLight()
  }

  ngOnInit(): void {
    this.subscription = this.orderSubject.getSubject().subscribe(
      id => {
        if (id === this.id)
          this.turnOn();
      }
    )
  };

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
