import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputSwitchChangeEvent, InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-switch-field',
  standalone: true,
  imports: [InputSwitchModule],
  templateUrl: './switch-field.component.html',
  styleUrl: './switch-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwitchFieldComponent,
      multi: true,
    },
  ],
})
export class SwitchFieldComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  value!: boolean;
  disabled!: boolean;

  onChanged!: (value: boolean) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  onSwitchChange(event: InputSwitchChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.checked;
    this.onChanged(this.value);
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
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
