import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  imports: [InputTextareaModule],
  templateUrl: './textarea-field.component.html',
  styleUrl: './textarea-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaFieldComponent,
      multi: true,
    },
  ],
})
export class TextareaFieldComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  value!: string;
  disabled!: boolean;

  onChanged!: (value: string) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  onInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    this.value = (event.target as HTMLInputElement).value;

    this.onChanged(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
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
