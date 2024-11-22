import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { PasswordModule } from 'primeng/password';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [PasswordModule, LabelComponent],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordFieldComponent,
      multi: true,
    },
  ],
})
export class PasswordFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: false }) feedback!: boolean;
  @Input({ required: false }) toggleMask!: boolean;

  onInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    this.value = (event.target as HTMLInputElement).value;

    this.onChanged(this.value);
  }
}
