import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-login',
  imports: [
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

  formLogin = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  submit() {
    
    if (this.formLogin.invalid) return;

    this.auth.login(this.formLogin.value as any).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => console.error('Credenciales incorrectas'),
    });
  }

}
