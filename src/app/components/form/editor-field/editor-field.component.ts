import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorBase } from '@utils/form-control-value-accessor-base.class';
import { EditorModule, EditorTextChangeEvent } from 'primeng/editor';
import { LabelComponent } from '@components/form/label/label.component';

@Component({
  selector: 'app-editor-field',
  standalone: true,
  imports: [EditorModule, LabelComponent],
  templateUrl: './editor-field.component.html',
  styleUrl: './editor-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditorFieldComponent,
      multi: true,
    },
  ],
})
export class EditorFieldComponent extends FormControlValueAccessorBase<string> {
  @Input({ required: true }) labelFor!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;

  onTextChange(event: EditorTextChangeEvent): void {
    if (this.disabled) {
      return;
    }

    this.value = event.htmlValue;
    this.onChanged(this.value);
  }
}
