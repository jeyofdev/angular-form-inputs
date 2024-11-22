import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-rating-field',
  standalone: true,
  imports: [RatingModule, LabelComponent],
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
  @Input() cancel!: boolean;
  @Input() stars: number = 5;

  onRatingChange(event: RatingRateEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.value;
    this.onChanged(this.value);
  }
}
