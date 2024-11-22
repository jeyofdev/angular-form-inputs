import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-mask-field',
  standalone: true,
  imports: [InputMaskModule],
  templateUrl: './mask-field.component.html',
  styleUrl: './mask-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskFieldComponent,
      multi: true,
    },
  ],
})
export class MaskFieldComponent
  extends FormControlValueAccessorBase<string>
  implements OnInit
{
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) type!: 'date' | 'phone';
  @Input({ required: true }) parentForm!: FormGroup;
  @Input() groupName!: string;

  mask!: string;

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.type === 'date') {
      this.mask = '99/99/9999';
    } else if (this.type === 'phone') {
      this.mask = '99-99-99-99-99';
    }
  }

  onInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    this.value = (event.target as HTMLInputElement).value;

    this.onChanged(this.value);
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
