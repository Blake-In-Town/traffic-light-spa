import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Observable, Subject } from 'rxjs'

export interface Light {
  color: string,
  time?: number,
};

const defaultLights: Light[] = [
  { color: 'red', time: 3 },
  { color: 'yellow', time: 3 },
  { color: 'green', time: 3 },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  @ViewChild('lightsCountInput')
  private lightsCountInput!: ElementRef<HTMLInputElement>;
  public orderSubject = new Subject<string>()
  public lights: Light[] = []
  public orderString = '012';
  public orderIndex = 0;

  public setLigthsCount = (): void => {
    if (this.lightsCountInput) {
      let count = Number(this.lightsCountInput.nativeElement.value)
      this.lights = []
      for (let index = 0; index < count; index++) {
        this.lights.push({ color: 'white', time: 1 })
      }
    } else {
      this.lights = defaultLights
    }
  };

  public changeColor(event: Event, light: Light) {
    const target = event.target as HTMLInputElement
    light.color = target.value || 'white'
  };

  public startTrafficLights() {
    this.orderSubject.next(this.orderString[this.orderIndex])
  }

  public switchLight(index: number) {
    console.log('index: ', index);
    if (this.orderIndex == this.orderString.length) {
      this.orderSubject.complete()
    } else {
      ++this.orderIndex;
      this.orderSubject.next(this.orderString[this.orderIndex]);
    }
  }



  ngOnInit(): void {
    this.setLigthsCount()
  };
}

