import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar-field',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './calendar-field.component.html',
  styleUrl: './calendar-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CalendarFieldComponent,
      multi: true,
    },
  ],
})
export class CalendarFieldComponent extends FormControlValueAccessorBase<Date> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input() dateFormat!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onSelectChange(date: Date): void {
    if (this.disabled) {
      return;
    }

    this.value = date;

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
