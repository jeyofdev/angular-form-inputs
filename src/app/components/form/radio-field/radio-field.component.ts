import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radio-field',
  standalone: true,
  imports: [RadioButtonModule],
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioFieldComponent),
      multi: true,
    },
  ],
})
export class RadioFieldComponent extends FormControlValueAccessorBase<string> {
  @Input() label!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() parentForm!: FormGroup;
  @Input() groupName!: string;

  onRadioChange(event: any): void {
    if (this.disabled) {
      return;
    }

    this.value = event.value;
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
