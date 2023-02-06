import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LightComponent } from './components/light/light.component';
import { FormControlTrafficLightsModule } from './modules/form-control-traffic-lights/form-control-traffic-lights.module';

@NgModule({
  declarations: [
    AppComponent,
    LightComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlTrafficLightsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
