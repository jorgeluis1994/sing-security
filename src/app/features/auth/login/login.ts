import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {


  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(MessageService);


  formLogin = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  submit() {
    if (this.formLogin.invalid) {
      this.toast.add({
        severity: 'warn',
        summary: 'Campos obligatorios',
        detail: 'Ingresa los datos',
      });
      return;
    }

    this.auth.login(this.formLogin.value as any).subscribe({
      next: () => this.router.navigate(['/']),
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Credenciales incorrectas',
          detail: 'Usuario o contraseña inválidos',
        }),
    });
  }


}
