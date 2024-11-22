import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { ColorPickerChangeEvent, ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-color-picker-field',
  standalone: true,
  imports: [ColorPickerModule],
  templateUrl: './color-picker-field.component.html',
  styleUrl: './color-picker-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerFieldComponent,
      multi: true,
    },
  ],
})
export class ColorPickerFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onColorChange(event: ColorPickerChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.value as string;
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
