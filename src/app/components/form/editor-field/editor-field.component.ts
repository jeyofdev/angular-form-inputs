import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { EditorModule, EditorTextChangeEvent } from 'primeng/editor';

@Component({
  selector: 'app-editor-field',
  standalone: true,
  imports: [EditorModule],
  templateUrl: './editor-field.component.html',
  styleUrl: './editor-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditorFieldComponent,
      multi: true,
    },
  ],
})
export class EditorFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onTextChange(event: EditorTextChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.htmlValue;
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
