import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManagementService } from '../services/auth.service';
import { first } from 'rxjs/operators';

export const adminGuard = async () => {
  const authManagementService = inject(AuthManagementService);
  const router = inject(Router);

  const logInState = await authManagementService
    .monitorAuthState()
    .pipe(first())
    .toPromise();
  if (logInState !== undefined) {
    if (logInState) {
      console.log('User is logged in');
    } else {
      console.log('User is logged out');
      router.navigate(['/auth-in']);
    }
  }
};
