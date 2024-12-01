import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './polling.component.html',
})
export class PollingComponent {
  @Input() poll: any;

  hasVoted = false;

  vote(option: any) {
    if (this.hasVoted) {
      alert('You have already voted on this poll.');
      return;
    }
    option.votes += 1;
    this.hasVoted = true;
  }
}
