import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  ToggleButtonChangeEvent,
  ToggleButtonModule,
} from 'primeng/togglebutton';

@Component({
  selector: 'app-toggle-field',
  standalone: true,
  imports: [ToggleButtonModule],
  templateUrl: './toggle-field.component.html',
  styleUrl: './toggle-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleFieldComponent,
      multi: true,
    },
  ],
})
export class ToggleFieldComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) onLabel!: string;
  @Input({ required: true }) offLabel!: string;

  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  checked!: boolean | undefined;
  disabled!: boolean;

  onChanged!: (checked: boolean | undefined) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  onToggleChange(event: ToggleButtonChangeEvent): void {
    console.log('ok', event);

    if (this.disabled) {
      return;
    }

    this.checked = event.checked;
    this.onChanged(this.checked);
  }

  writeValue(checked: boolean | undefined): void {
    this.checked = checked;
  }

  registerOnChange(fn: (vchecked: boolean | undefined) => void): void {
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
