import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { TextareaFieldComponent } from './components/form/textarea-field/textarea-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { MaskFieldComponent } from './components/form/mask-field/mask-field.component';
import { DropdownFieldComponent } from './components/form/dropdown-field/dropdown-field.component';
import { CheckboxFieldComponent } from './components/form/checkbox-field/checkbox-field.component';
import { RadioFieldComponent } from './components/form/radio-field/radio-field.component';
import { ToggleFieldComponent } from './components/form/toggle-field/toggle-field.component';
import { SliderFieldComponent } from './components/form/slider-field/slider-field.component';
import { RatingFieldComponent } from './components/form/rating-field/rating-field.component';
import { SelectButtonFieldComponent } from './components/form/select-button-field/select-button-field.component';
import { NumberFieldComponent } from './components/form/number-field/number-field.component';
import { SwitchFieldComponent } from './components/form/switch-field/switch-field.component';
import { EditorFieldComponent } from './components/form/editor-field/editor-field.component';
import { ColorPickerFieldComponent } from './components/form/color-picker-field/color-picker-field.component';
import { CalendarFieldComponent } from './components/form/calendar-field/calendar-field.component';
import { AutocompleteFieldComponent } from './components/form/autocomplete-field/autocomplete-field.component';

interface City {
  name: string;
}

interface Job {
  name: string;
}

export interface Active {
  label: string;
  value: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    TextFieldComponent,
    TextareaFieldComponent,
    PasswordFieldComponent,
    MaskFieldComponent,
    DropdownFieldComponent,
    CheckboxFieldComponent,
    RadioFieldComponent,
    ToggleFieldComponent,
    SliderFieldComponent,
    RatingFieldComponent,
    SelectButtonFieldComponent,
    NumberFieldComponent,
    SwitchFieldComponent,
    EditorFieldComponent,
    ColorPickerFieldComponent,
    CalendarFieldComponent,
    AutocompleteFieldComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cityList!: City[];
  jobList!: City[];
  languagesOptions!: string[];
  activeOptions!: Active[];
  mainForm!: FormGroup;

  usernameCtrl!: FormControl<string | null>;
  descriptionCtrl!: FormControl<string | null>;
  passwordCtrl!: FormControl<string | null>;
  phoneCtrl!: FormControl<string | null>;
  birthdateCtrl!: FormControl<string | null>;
  cityCtrl!: FormControl<string | null>;
  languagesCtrl!: FormControl<string[] | null>;
  premiumCtrl!: FormControl<string | null>;
  adminCtrl!: FormControl<boolean | null>;
  ageCtrl!: FormControl<number | null>;
  ratingCtrl!: FormControl<number | null>;
  activeCtrl!: FormControl<string | null>;
  zipCodeCtrl!: FormControl<string | null>;
  priceCtrl!: FormControl<string | null>;
  memberCtrl!: FormControl<boolean | null>;
  biographyCtrl!: FormControl<string | null>;
  colorCtrl!: FormControl<string | null>;
  calendarCtrl!: FormControl<Date | null>;
  jobCtrl!: FormControl<string | null>;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cityList = this._getCities();
    this.languagesOptions = this._getLanguagesOptions();
    this.activeOptions = this._getActiveOptions();
    this.jobList = this._getJobOptions();
    this._initFormControls();
    this._initMainForm();
  }

  onSubmit() {
    console.log(this.mainForm.value);
  }

  onCitySelected(city: string): void {
    this.cityCtrl.setValue(city);
  }

  onJobSelected(job: string): void {
    this.jobCtrl.setValue(job);
  }

  private _initMainForm() {
    this.mainForm = this._formBuilder.group({
      username: this.usernameCtrl,
      description: this.descriptionCtrl,
      password: this.passwordCtrl,
      phone: this.phoneCtrl,
      birthdate: this.birthdateCtrl,
      city: this.cityCtrl,
      languages: this.languagesCtrl,
      premium: this.premiumCtrl,
      admin: this.adminCtrl,
      age: this.ageCtrl,
      rating: this.ratingCtrl,
      active: this.activeCtrl,
      zipCode: this.zipCodeCtrl,
      price: this.priceCtrl,
      member: this.memberCtrl,
      biography: this.biographyCtrl,
      color: this.colorCtrl,
      calendar: this.calendarCtrl,
      job: this.jobCtrl,
    });
  }

  private _initFormControls(): void {
    this.usernameCtrl = this._formBuilder.control('');
    this.descriptionCtrl = this._formBuilder.control('');
    this.passwordCtrl = this._formBuilder.control('');
    this.phoneCtrl = this._formBuilder.control('');
    this.birthdateCtrl = this._formBuilder.control('');
    this.cityCtrl = this._formBuilder.control('');
    this.languagesCtrl = this._formBuilder.control([]);
    this.premiumCtrl = this._formBuilder.control('');
    this.adminCtrl = this._formBuilder.control(false);
    this.ageCtrl = this._formBuilder.control(0);
    this.ratingCtrl = this._formBuilder.control(0);
    this.activeCtrl = this._formBuilder.control('');
    this.zipCodeCtrl = this._formBuilder.control('');
    this.priceCtrl = this._formBuilder.control('');
    this.memberCtrl = this._formBuilder.control(false);
    this.colorCtrl = this._formBuilder.control('');
    this.calendarCtrl = this._formBuilder.control(null);
    this.jobCtrl = this._formBuilder.control('');
  }

  private _getCities(): City[] {
    return [
      { name: 'Paris' },
      { name: 'Bordeaux' },
      { name: 'Lyon' },
      { name: 'Toulouse' },
      { name: 'Rennes' },
      { name: 'Marseille' },
      { name: 'Nice' },
    ];
  }

  private _getLanguagesOptions(): string[] {
    return ['Javascript', 'Php', 'Java', 'Python', 'Go'];
  }

  private _getActiveOptions(): Active[] {
    return [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];
  }

  private _getJobOptions(): Job[] {
    return [
      { name: 'Front-end' },
      { name: 'Back-end' },
      { name: 'Fullstack' },
      { name: 'Front React' },
      { name: 'Front Angular' },
      { name: 'Back Php' },
      { name: 'Back Java' },
      { name: 'Back Go' },
    ];
  }
}
