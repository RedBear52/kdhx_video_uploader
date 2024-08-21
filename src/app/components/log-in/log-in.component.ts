import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManagementService } from '../../services/auth.service';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  email: string = '';
  password: string = '';
  loginForm: FormGroup;
  signUpForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthManagementService,
    private router: Router
  ) {
    (this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })),
      (this.signUpForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      }));
  }

  async onLogIn() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl && passwordControl) {
      try {
        await this.authService.onLogIn(
          // Replace 'authManagementService' with 'authService'
          emailControl.value,
          passwordControl.value
        );
        this.router.navigate(['/upload-book']);
      } catch (error: any) {
        this.error = error.message.slice(10);
      } finally {
        this.loginForm.reset();
      }
    }
  }

  async onSignUp() {
    const emailControl = this.signUpForm.get('email');
    const passwordControl = this.signUpForm.get('password');

    if (emailControl && passwordControl) {
      try {
        await this.authService.onSignUp(
          // Replace 'authManagementService' with 'authService'
          emailControl.value,
          passwordControl.value
        );
        this.router.navigate(['/upload-book']);
      } catch (error: any) {
        this.error = error.message.slice(10);
      } finally {
        this.signUpForm.reset();
      }
    }
  }

  async onLogOut() {
    this.authService.onLogOut(); // Replace 'authManagementService' with 'authService'
  }
}
import { CommonModule } from '@angular/common';
