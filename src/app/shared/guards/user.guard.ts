import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()

export class UserGuard implements CanActivate {
  isAdmin: any;
  constructor(private router: Router) {
  }

  async canActivate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/403']);
      return false;
    }
  }

}
