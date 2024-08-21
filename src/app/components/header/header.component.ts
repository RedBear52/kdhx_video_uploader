import { Component } from '@angular/core';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase.config';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthManagementService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isScrolled = false;
  isLoggedIn: boolean = false;

  constructor(
    private authManagementService: AuthManagementService,
    private router: Router
  ) {}

  // @HostListener('window:scroll')
  // scrollEvent() {
  //   window.scrollY >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  // }

  ngOnInit() {
    this.authManagementService
      .monitorAuthState()
      .subscribe((logInState: boolean | undefined) => {
        if (logInState !== undefined) {
          this.isLoggedIn = logInState;
        }
      });
  }

  async onLogOut() {
    try {
      await signOut(auth);
      console.log('User logged out');
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }
}
