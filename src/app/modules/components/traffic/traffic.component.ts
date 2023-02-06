import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type TLColor = 'red' | "yellow" | "green";

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.sass'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrafficComponent),
    multi: true,
  }]
})
export class TrafficComponent implements OnInit, ControlValueAccessor {

  private _currentColor: TLColor;
  public _colors: TLColor[] = ['red','yellow','green']
  public propagateChange = (color: TLColor) => {};
  public propagateTouch = (color: TLColor) => {};

  constructor() { }
  writeValue(color: TLColor): void {
    this.currentColor = color;
  }

  get currentColor() {
    return this._currentColor;
  }

  set currentColor(color: TLColor) {
    this._currentColor = color;
    this.propagateChange(color);
    this.propagateTouch(color);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {
  }

  toogleDown() {
    this._currentColor = this._colors[(this._colors.indexOf(this.currentColor) + 1) % 3]
  };

  toogleUp() {
    this._currentColor = this._colors[(this._colors.indexOf(this.currentColor) - 1) % 3]
  }

  switchColor(color: TLColor) {
    this._currentColor = color;
  }

}
