import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_POLLS } from '../../mock-polls';
import { PollingComponent } from '../../components/polling/polling.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, PollingComponent, CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  polls = MOCK_POLLS;
}
