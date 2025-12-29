import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.api.baseUrl;
  private auth = environment.api.auth;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(data: { user: string; password: string }) {
    return this.http.post<any>(
      `${this.baseUrl}${this.auth.endpoints.login}`,
      data
    ).pipe(
      tap(res => {
        if (this.isBrowser) {
          localStorage.setItem(
            this.auth.storage.tokenKey,
            res.access_token
          );
        }
      })
    );
  }

  register(data: any) {
    return this.http.post(
      `${this.baseUrl}${this.auth.endpoints.register}`,
      data
    );
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this.auth.storage.tokenKey);
    }
  }

  get token(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.auth.storage.tokenKey);
    }
    return null; // SSR
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
