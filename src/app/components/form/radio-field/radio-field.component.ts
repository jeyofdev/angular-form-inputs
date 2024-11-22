import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radio-field',
  standalone: true,
  imports: [RadioButtonModule],
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioFieldComponent),
      multi: true,
    },
  ],
})
export class RadioFieldComponent extends FormControlValueAccessorBase<string> {
  @Input() label!: string;
  @Input() id!: string;

  onRadioChange(event: any): void {
    if (this.disabled) {
      return;
    }

    this.value = event.value;
    this.onChanged(this.value);
  }
}
