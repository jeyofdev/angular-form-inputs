import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';

@Component({
  selector: 'app-autocomplete-field',
  standalone: true,
  imports: [AutoCompleteModule],
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
export class AutocompleteFieldComponent
  implements ControlValueAccessor, OnInit
{
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) optionList!: any[];
  @Input({ required: false }) placeholder!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  selectedOption: any;
  filteredOptions!: any[];

  @Output() selectedValueChange = new EventEmitter<any>();

  value!: string;
  disabled!: boolean;

  onChanged!: (value: string) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

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

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched(): void {
    this.onTouched();
  }

  getFormControl(
    groupName: string,
    parentForm: FormGroup,
    controlName: string
  ) {
    if (groupName) {
      const group = parentForm.get(groupName) as FormGroup;
      return group ? group.get(controlName) : null;
    } else {
      return parentForm.get(controlName);
    }
  }

  get control(): AbstractControl<any, any> | null {
    return this.getFormControl(
      this.groupName || '',
      this.parentForm,
      this.name
    );
  }
}
