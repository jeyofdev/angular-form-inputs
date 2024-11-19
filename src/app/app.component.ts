import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { TextareaFieldComponent } from './components/form/textarea-field/textarea-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { MaskFieldComponent } from './components/form/mask-field/mask-field.component';

interface City {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    TextFieldComponent,
    TextareaFieldComponent,
    PasswordFieldComponent,
    MaskFieldComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cityList: City[] | undefined;
  languagesOptions!: string[];
  form!: FormGroup;

  usernameCtrl!: FormControl<string | null>;
  descriptionCtrl!: FormControl<string | null>;
  passwordCtrl!: FormControl<string | null>;
  phoneCtrl!: FormControl<string | null>;
  birthdateCtrl!: FormControl<string | null>;
  cityCtrl!: FormControl<string | null>;
  languagesCtrl!: FormControl<string[] | null>;
  premiumCtrl!: FormControl<string | null>;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cityList = this._getCities();
    this.languagesOptions = this._getLanguagesOptions();
    this._initFormControls();
    this._initMainForm();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onCheckboxChange(event: any, language: string): void {
    let selectedLanguages = [...(this.languagesCtrl.value || [])];

    if (event.checked) {
      if (!selectedLanguages.includes(language)) {
        selectedLanguages.push(language);
      }
    } else {
      selectedLanguages = selectedLanguages.filter((item) => item !== language);
    }

    this.languagesCtrl.setValue(selectedLanguages);
  }

  private _initMainForm() {
    this.form = this._formBuilder.group({
      username: this.usernameCtrl,
      description: this.descriptionCtrl,
      password: this.passwordCtrl,
      phone: this.phoneCtrl,
      birthdate: this.birthdateCtrl,
      city: this.cityCtrl,
      languages: this.languagesCtrl,
      premium: this.premiumCtrl,
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
}
