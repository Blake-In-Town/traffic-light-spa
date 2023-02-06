import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { LightSwitchService } from './services/light-switch.service'

export interface Light {
  id: string,
  color: string,
  time?: number,
};

const defaultLights: Light[] = [
  { id: "0", color: 'red', time: 1 },
  { id: "1", color: 'yellow', time: 1 },
  { id: "2", color: 'green', time: 1 },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  sub: Subscription

  constructor(
    private orderSubject: LightSwitchService
  ) {}

  public trafficControl: FormControl;
  // ----------------------

  @ViewChild('lightsCountInput')
  private lightsCountInput!: ElementRef<HTMLInputElement>;
  public lights: Light[] = []
  public orderString = '012'

  public setLigthsCount = (): void => {
    if (this.lightsCountInput) {
      let count = Number(this.lightsCountInput.nativeElement.value)
      this.lights = []
      for (let index = 0; index < count; index++) {
        this.lights.push({id: index.toString(), color: 'white', time: 1 })
      }
    } else {
      this.lights = defaultLights
    }
  };

  public changeColor(event: Event, light: Light) {
    const target = event.target as HTMLInputElement
    light.color = target.value || 'white'
  };


  public testObs?: Observable<number[]>

  public testSubj = new BehaviorSubject<number[]>([])

  public startTrafficLights() {
    this.orderSubject.getOrder(this.orderString)

    this.testObs = this.testSubj
    this.testSubj.next([1,2,3])
    this.testObs.subscribe(
      value => console.log('value: ', value)
    )
  }

  ngOnInit(): void {
    this.setLigthsCount();

    this.trafficControl = new FormControl();
    this.sub = this.trafficControl.valueChanges.subscribe(
      (value) => {
        console.log('value: ', value);
      }
    )
    console.log('this.trafficControl: ', this.trafficControl);

  };

  ngAfterViewInit(): void {


  }

  ngOnDestroy(): void {
    this.orderSubject.unsubscribe();
    this.sub.unsubscribe
  }
}

