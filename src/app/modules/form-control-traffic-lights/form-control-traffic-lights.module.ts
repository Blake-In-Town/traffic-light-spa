import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficComponent } from '../components/traffic/traffic.component';



@NgModule({
  declarations: [
    TrafficComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrafficComponent
  ]
})
export class FormControlTrafficLightsModule { }
