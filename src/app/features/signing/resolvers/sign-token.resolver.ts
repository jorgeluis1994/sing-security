import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    RedirectCommand
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { TokenAccessService } from '../services/sign-token.service';

@Injectable({ providedIn: 'root' })
export class SignTokenResolver implements Resolve<boolean | RedirectCommand> {

    constructor(
        private tokenService: TokenAccessService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const token = route.queryParamMap.get('token');
        

        if (!token) {
            return new RedirectCommand(this.router.parseUrl('/auth'));
        }

        return this.tokenService.validateToken(token).pipe(
            map((resp: any) => {
                return resp.success === true
                    ? true
                    : new RedirectCommand(this.router.parseUrl('/sign'));
            }),
            catchError(() =>
                of(new RedirectCommand(this.router.parseUrl('/auth/login')))
            )
        );
    }
}
