import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './polling.component.html'
})
export class PollingComponent {
  @Input() poll: any;

  vote(option: any) {
    option.votes += 1;
  }
}
