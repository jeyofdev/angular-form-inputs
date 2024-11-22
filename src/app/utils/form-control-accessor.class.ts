import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Directive()
export class FormControlAccessor {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

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
