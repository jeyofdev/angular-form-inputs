import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [PasswordModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordFieldComponent,
      multi: true,
    },
  ],
})
export class PasswordFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: false }) feedback!: boolean;
  @Input({ required: false }) toggleMask!: boolean;

  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    this.value = (event.target as HTMLInputElement).value;

    this.onChanged(this.value);
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
