import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { InputSwitchChangeEvent, InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-switch-field',
  standalone: true,
  imports: [InputSwitchModule],
  templateUrl: './switch-field.component.html',
  styleUrl: './switch-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwitchFieldComponent,
      multi: true,
    },
  ],
})
export class SwitchFieldComponent extends FormControlValueAccessorBase<boolean> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;

  onSwitchChange(event: InputSwitchChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.checked;
    this.onChanged(this.value);
  }
}
