import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PollingComponent } from './components/polling/polling.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'polling', component: PollingComponent },
  ];
