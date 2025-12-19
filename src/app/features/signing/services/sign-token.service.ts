import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TokenAccessService {

    private baseUrl = environment.api.baseUrl;
    private endpoint = environment.signing.endpoints.validateToken;

    constructor(private http: HttpClient) { }

    validateToken(token: string) {
        return this.http.post(
            `${this.baseUrl}${this.endpoint}`,
            { token }
        );
    }
}
