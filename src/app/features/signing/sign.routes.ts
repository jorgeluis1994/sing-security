import { Routes } from '@angular/router';
import { SingEntry } from './components/sing-entry/sing-entry';
import { SignTokenResolver } from './resolvers/sign-token.resolver';


export const SIGN_ROUTES: Routes = [
  {
    path: '',
    component: SingEntry,
    resolve: {
      tokenValid: SignTokenResolver
    }
  },
];
