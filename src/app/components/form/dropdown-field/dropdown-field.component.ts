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
export class DropdownFieldComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) optionList!: any[];
  @Input({ required: false }) placeholder!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  @Output() selectedValueChange = new EventEmitter<any>();

  value!: string;
  disabled!: boolean;

  onChanged!: (value: string) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    this.disabled = false;
  }

  onInputChange(event: DropdownChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.onChanged(event.value.id);
    this.selectedValueChange.emit(event.value);
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
