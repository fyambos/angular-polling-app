import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PollingComponent } from './components/polling/polling.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'polling', component: PollingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
  ];
