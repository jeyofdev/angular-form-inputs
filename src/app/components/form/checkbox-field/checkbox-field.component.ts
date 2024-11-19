import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [CheckboxModule],
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxFieldComponent),
      multi: true,
    },
  ],
})
export class CheckboxFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() parentForm!: FormGroup;
  @Input() groupName!: string;

  value: string[] = [];
  disabled: boolean = false;

  onChanged!: (value: string[]) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  onCheckboxChange(event: any): void {
    if (this.disabled) {
      return;
    }
    const checked = event.checked;
    if (checked) {
      this.value.push(this.id);
    } else {
      this.value = this.value.filter((val) => val !== this.id);
    }
    this.onChanged(this.value);
  }

  writeValue(value: string[]): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
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
