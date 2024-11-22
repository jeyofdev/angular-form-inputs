import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
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
export class SwitchFieldComponent extends FormControlValueAccessorBase<boolean> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onSwitchChange(event: InputSwitchChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.checked;
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
