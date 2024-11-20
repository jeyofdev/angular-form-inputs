import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-slider-field',
  standalone: true,
  imports: [FormsModule, SliderModule, InputTextModule],
  templateUrl: './slider-field.component.html',
  styleUrl: './slider-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SliderFieldComponent,
      multi: true,
    },
  ],
})
export class SliderFieldComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) min!: number;
  @Input({ required: true }) max!: number;

  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  value!: number;
  disabled!: boolean;

  onChanged!: (value: number) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  onInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    const inputValue = (event.target as HTMLInputElement).value;

    const numericValue = Math.max(
      this.min,
      Math.min(this.max, +inputValue || 0)
    );

    this.value = numericValue;

    this.onChanged(this.value);
  }

  onSliderChange(event: SliderChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.value as number;
    this.onChanged(this.value);
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
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

  getFormControl(
    groupName: string,
    parentForm: FormGroup,
    controlName: string
  ) {
    if (groupName) {
      const group = parentForm.get(groupName) as FormGroup;
      return group ? group.get(controlName) : null;
    } else {
      return parentForm.get(controlName);
    }
  }

  get control(): AbstractControl<any, any> | null {
    return this.getFormControl(
      this.groupName || '',
      this.parentForm,
      this.name
    );
  }
}
