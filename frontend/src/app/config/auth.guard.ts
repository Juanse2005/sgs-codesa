import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('userToken');

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

