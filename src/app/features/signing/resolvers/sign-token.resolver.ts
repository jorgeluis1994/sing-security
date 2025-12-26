import { inject, Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    RedirectCommand
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { TokenAccessService } from '../services/sign-token.service';
import { LoadingService } from '../../../core/services/loading.service';

@Injectable({ providedIn: 'root' })
export class SignTokenResolver implements Resolve<boolean | RedirectCommand> {


    constructor(
        private tokenService: TokenAccessService,
        private router: Router,
        private loading: LoadingService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {

    const token = route.queryParamMap.get('token');
    

    if (!token) {
      return new RedirectCommand(this.router.parseUrl('/errors/token-expired'));
    }

    // 🔄 MOSTRAR LOADING
    this.loading.show('Validando token...');

  

    return this.tokenService.validateToken(token).pipe(
      map((resp: any) => {
        this.loading.hide();

        return resp.success === true
          ? true
          : new RedirectCommand(this.router.parseUrl('/sign'));
      }),
      catchError(() => {
        this.loading.hide();
        return of(new RedirectCommand(this.router.parseUrl('/errors/token-expired')));
      })
    );
  }
}
