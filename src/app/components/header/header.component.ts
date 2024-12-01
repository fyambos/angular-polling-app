// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, signOut, User as FirebaseUser } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

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
  firebaseUser: FirebaseUser | null = null;
  userProfile: User | null = null; // Firestore user data

  constructor(private auth: Auth, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (firebaseUser) => {
      
      this.firebaseUser = firebaseUser;
  
      if (firebaseUser) {
        try {
          // Fetch user profile from Firestore
          const userProfile = await this.userService.getUserProfile(firebaseUser.uid);
  
          if (userProfile) {
            // Existing profile: load it
            this.userProfile = userProfile;
          } else {
            // No profile found: create a new default profile
            const defaultProfile: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              role: 'user', // Default role
              createdAt: new Date(),
              updatedAt: new Date(),
            };
  
            // Create the new profile
            await this.userService.createUserProfile(firebaseUser.uid, defaultProfile);
            this.userProfile = defaultProfile;
          }
        } catch (error) {
          console.error('Error fetching or creating user profile:', error);
        }
      }
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

  openDashboard() {
    this.router.navigate(['/upload']);
  }

  openProfile() {
    this.router.navigate(['/profile']);
  }
}
