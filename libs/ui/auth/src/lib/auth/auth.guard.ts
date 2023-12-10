import {Injectable} from "@angular/core";
import {CanActivate} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class IsLoggedIn implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.user$.value.isLoggedIn) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}

@Injectable()
export class IsAdmin implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.authService.user$.value.role === 'admin';
  }
}
