import { Component, OnInit } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  
  constructor(private auth: Auth, private router: Router) {}
  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }
  signOutUser() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  }
}