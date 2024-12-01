import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  nickname: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private userService: UserService) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      const profile = await this.userService.getUserProfile(user.uid);
      this.nickname = profile?.nickname || '';
    }
  }

  async updateProfile() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.userService.updateUserProfile(user.uid, { nickname: this.nickname });
        alert('Profile updated successfully');
      } catch (error) {
        this.errorMessage = 'Failed to update profile.';
      }
    }
  }
}
