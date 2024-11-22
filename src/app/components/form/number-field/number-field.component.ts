import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [InputNumberModule],
  templateUrl: './number-field.component.html',
  styleUrl: './number-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberFieldComponent,
      multi: true,
    },
  ],
})
export class NumberFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input() mode!: 'decimal' | 'currency';
  @Input() currency: 'USD' | 'EUR' | 'JPY' = 'USD';
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onInputChange(event: InputNumberInputEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.formattedValue;
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
