import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [InputNumberModule, LabelComponent],
  templateUrl: './number-field.component.html',
  styleUrl: './number-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberFieldComponent,
      multi: true,
    },
  ],
})
export class NumberFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input() mode!: 'decimal' | 'currency';
  @Input() currency: 'USD' | 'EUR' | 'JPY' = 'USD';

  onInputChange(event: InputNumberInputEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.formattedValue;
    this.onChanged(this.value);
  }
}
