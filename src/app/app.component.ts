import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Auth, User as FirebaseUser, onAuthStateChanged } from '@angular/fire/auth';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'polling-app';

  constructor(private auth: Auth, private userService: UserService) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user: FirebaseUser | null) => {
      if (user) {
        await this.userService.createOrUpdateUserProfile(user.uid, {
          email: user.email!,
          role: 'user',
          createdAt: new Date(),
        });
      }
    });
  }
}