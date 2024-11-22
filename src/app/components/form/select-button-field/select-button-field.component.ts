import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  SelectButtonModule,
  SelectButtonOptionClickEvent,
} from 'primeng/selectbutton';
import { Active } from '../../../app.component';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-select-button-field',
  standalone: true,
  imports: [SelectButtonModule, LabelComponent],
  templateUrl: './select-button-field.component.html',
  styleUrl: './select-button-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectButtonFieldComponent,
      multi: true,
    },
  ],
})
export class SelectButtonFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) optionList!: Active[];

  onInputChange(event: SelectButtonOptionClickEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.option.value;
    this.onChanged(this.value);
  }
}
