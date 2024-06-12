import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardsService {
  isLoggedIn = false;
  constructor(private userService: AuthService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  canActivate(): any {
    if (isPlatformBrowser(this.platformId)) {
      this.checkTokenPeriodically();
      this.isLoggedIn = this.userService.isLoggedIn();
    }
    if (isPlatformBrowser(this.platformId)) {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
return false;
}

checkTokenPeriodically(): void {
  if (isPlatformBrowser(this.platformId)) {
    setInterval(() => {
      this.userService.checkAdminAccess();
      this.isLoggedIn = this.userService.isLoggedIn();
    }, 3000); // Kiểm tra mỗi 5 giây
  }
}
}