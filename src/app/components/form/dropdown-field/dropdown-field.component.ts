import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown-field',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './dropdown-field.component.html',
  styleUrl: './dropdown-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFieldComponent),
      multi: true,
    },
  ],
})
export class DropdownFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) optionList!: any[];
  @Input({ required: false }) placeholder!: string;

  @Output() selectedValueChange = new EventEmitter<any>();

  onInputChange(event: DropdownChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.onChanged(event.value.id);
    this.selectedValueChange.emit(event.value);
  }
}
