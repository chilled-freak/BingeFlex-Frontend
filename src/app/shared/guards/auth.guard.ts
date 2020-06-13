import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  async canActivate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.isLoggedin) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
