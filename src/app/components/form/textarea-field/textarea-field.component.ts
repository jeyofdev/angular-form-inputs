import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  imports: [InputTextareaModule, LabelComponent],
  templateUrl: './textarea-field.component.html',
  styleUrl: './textarea-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaFieldComponent,
      multi: true,
    },
  ],
})
export class TextareaFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;

  onInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    this.value = (event.target as HTMLInputElement).value;

    this.onChanged(this.value);
  }
}
