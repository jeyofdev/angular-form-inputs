import { Component, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { InputTextModule } from 'primeng/inputtext';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-slider-field',
  standalone: true,
  imports: [FormsModule, SliderModule, InputTextModule, LabelComponent],
  templateUrl: './slider-field.component.html',
  styleUrl: './slider-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SliderFieldComponent,
      multi: true,
    },
  ],
})
export class SliderFieldComponent extends FormControlValueAccessorBase<number> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) min!: number;
  @Input({ required: true }) max!: number;

  onInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    const inputValue = (event.target as HTMLInputElement).value;

    const numericValue = Math.max(
      this.min,
      Math.min(this.max, +inputValue || 0)
    );

    this.value = numericValue;

    this.onChanged(this.value);
  }

  onSliderChange(event: SliderChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.value as number;
    this.onChanged(this.value);
  }
}
