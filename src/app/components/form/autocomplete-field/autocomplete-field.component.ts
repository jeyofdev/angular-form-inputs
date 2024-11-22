import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-autocomplete-field',
  standalone: true,
  imports: [AutoCompleteModule, LabelComponent],
  templateUrl: './autocomplete-field.component.html',
  styleUrl: './autocomplete-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteFieldComponent),
      multi: true,
    },
  ],
})
export class AutocompleteFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) optionList!: any[];
  @Input({ required: false }) placeholder!: string;

  selectedOption: any;
  filteredOptions!: any[];

  @Output() selectedValueChange = new EventEmitter<any>();

  filterOptions(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.optionList as any[]).length; i++) {
      let country = (this.optionList as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredOptions = filtered;
  }

  onOptionSelect(event: AutoCompleteSelectEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.value.name;
    this.onChanged(event.value.name);
    this.selectedValueChange.emit(this.value);
  }
}
