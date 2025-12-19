import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = environment.api.baseUrl;
    private auth = environment.auth;

    constructor(private http: HttpClient) { }

    login(data: { user: string; password: string }) {

        
        return this.http.post<any>(
            `${this.baseUrl}${this.auth.endpoints.login}`,
            data
        ).pipe(
            tap(res =>
                localStorage.setItem(this.auth.storage.tokenKey, res.access_token)
            )
        );
    }

    register(data: any) {
        return this.http.post(
            `${this.baseUrl}${this.auth.endpoints.register}`,
            data
        );
    }

    logout() {
        localStorage.removeItem(this.auth.storage.tokenKey);
    }

    get token(): string | null {
        return localStorage.getItem(this.auth.storage.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }
}
