import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar-field',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './calendar-field.component.html',
  styleUrl: './calendar-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CalendarFieldComponent,
      multi: true,
    },
  ],
})
export class CalendarFieldComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input() dateFormat!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  value!: Date;
  disabled!: boolean;

  onChanged!: (value: Date) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  onSelectChange(date: Date): void {
    if (this.disabled) {
      return;
    }

    this.value = date;

    this.onChanged(this.value);
  }

  writeValue(value: Date): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date) => void): void {
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
