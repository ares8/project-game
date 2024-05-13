import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginVerificationGuard } from './login-verification.guard';

describe('loginVerificationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginVerificationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
