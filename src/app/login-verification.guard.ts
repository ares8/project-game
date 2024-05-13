import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from './services/user-info.service';

export const loginVerificationGuard: CanActivateFn = () => {
  const loginInfo = inject(UserInfoService);
  const router = inject(Router);

  if (loginInfo.login) {
    return true;
  }

  alert('Verify your name and token first!');
  return router.createUrlTree(['/intro']);
};
