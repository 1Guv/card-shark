import { Signal, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoggedInUserService } from '../services/logged-in-user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const loggedInUserService = inject(LoggedInUserService);
  let isLoggedIn: Signal<boolean> = loggedInUserService.getData();
  const router = inject(Router);

  if (!isLoggedIn()) {
    router.navigateByUrl('');
    return false;
  }
  return true;
};
