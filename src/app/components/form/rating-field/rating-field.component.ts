import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { RatingModule, RatingRateEvent } from 'primeng/rating';

@Component({
  selector: 'app-rating-field',
  standalone: true,
  imports: [RatingModule],
  templateUrl: './rating-field.component.html',
  styleUrl: './rating-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingFieldComponent,
      multi: true,
    },
  ],
})
export class RatingFieldComponent extends FormControlValueAccessorBase<number> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input() cancel!: boolean;
  @Input() stars: number = 5;

  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  onRatingChange(event: RatingRateEvent): void {
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
