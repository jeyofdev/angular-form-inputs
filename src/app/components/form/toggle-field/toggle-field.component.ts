import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
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
export class ToggleFieldComponent extends FormControlValueAccessorBase<boolean> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) onLabel!: string;
  @Input({ required: true }) offLabel!: string;

  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onToggleChange(event: ToggleButtonChangeEvent): void {
    console.log('ok', event);

    if (this.disabled) {
      return;
    }

    this.value = event.checked as boolean;
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
