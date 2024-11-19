import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  usernameCtrl!: FormControl<string | null>;

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
    });
  }

  private _initFormControls(): void {
    this.usernameCtrl = this._formBuilder.control('');
  }
}
