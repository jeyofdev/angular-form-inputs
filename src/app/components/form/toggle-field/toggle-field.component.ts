import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import {
  ToggleButtonChangeEvent,
  ToggleButtonModule,
} from 'primeng/togglebutton';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-toggle-field',
  standalone: true,
  imports: [ToggleButtonModule, LabelComponent],
  templateUrl: './toggle-field.component.html',
  styleUrl: './toggle-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleFieldComponent,
      multi: true,
    },
  ],
})
export class ToggleFieldComponent extends FormControlValueAccessorBase<boolean> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) onLabel!: string;
  @Input({ required: true }) offLabel!: string;

  onToggleChange(event: ToggleButtonChangeEvent): void {
    console.log('ok', event);

    if (this.disabled) {
      return;
    }

    this.value = event.checked as boolean;
    this.onChanged(this.value);
  }
}
