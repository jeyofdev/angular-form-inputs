import { Directive, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormControlAccessor } from './form-control-accessor.class';

@Directive()
export class FormControlValueAccessorBase<T>
  extends FormControlAccessor
  implements ControlValueAccessor, OnInit
{
  value!: T;
  disabled!: boolean;

  onChanged!: (value: T) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched(): void {
    this.onTouched();
  }
}
