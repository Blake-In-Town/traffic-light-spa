import { Component, OnInit } from '@angular/core';

export interface Light {
  color: string,
  time?: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'traffic-light';
  public lightCount: number = 2;
  public lights: Light[] = [];

  public setLigthsCount = (lightCount: number): void => {
    this.lights = new Array<Light>(lightCount);
    console.log('this.lights: ', this.lights);
  }

  ngOnInit(): void {
    this.setLigthsCount(this.lightCount)
  }
}

