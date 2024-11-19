import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    InputMaskModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  usernameCtrl!: FormControl<string | null>;
  descriptionCtrl!: FormControl<string | null>;
  passwordCtrl!: FormControl<string | null>;
  phoneCtrl!: FormControl<string | null>;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initFormControls();
    this._initMainForm();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  private _initMainForm() {
    this.form = this._formBuilder.group({
      username: this.usernameCtrl,
      description: this.descriptionCtrl,
      password: this.passwordCtrl,
      phone: this.phoneCtrl,
    });
  }

  private _initFormControls(): void {
    this.usernameCtrl = this._formBuilder.control('');
    this.descriptionCtrl = this._formBuilder.control('');
    this.passwordCtrl = this._formBuilder.control('');
    this.phoneCtrl = this._formBuilder.control('');
  }
}
