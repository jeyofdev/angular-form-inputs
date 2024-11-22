import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  SelectButtonModule,
  SelectButtonOptionClickEvent,
} from 'primeng/selectbutton';
import { Active } from '../../../app.component';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';

@Component({
  selector: 'app-select-button-field',
  standalone: true,
  imports: [SelectButtonModule],
  templateUrl: './select-button-field.component.html',
  styleUrl: './select-button-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectButtonFieldComponent,
      multi: true,
    },
  ],
})
export class SelectButtonFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) optionList!: Active[];

  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onInputChange(event: SelectButtonOptionClickEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.option.value;
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
