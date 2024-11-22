import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { CalendarModule } from 'primeng/calendar';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-calendar-field',
  standalone: true,
  imports: [CalendarModule, LabelComponent],
  templateUrl: './calendar-field.component.html',
  styleUrl: './calendar-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CalendarFieldComponent,
      multi: true,
    },
  ],
})
export class CalendarFieldComponent extends FormControlValueAccessorBase<Date> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input() dateFormat!: string;

  onSelectChange(date: Date): void {
    if (this.disabled) {
      return;
    }

    this.value = date;

    this.onChanged(this.value);
  }
}
