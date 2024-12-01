import { Component, Input } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './polling.component.html',
})
export class PollingComponent {
  @Input() poll: any;
  @Input() pollId!: string;
  hasVoted = false;

  constructor(private pollService: PollService) {}

vote(optionIndex: number) {
  if (this.hasVoted) {
    alert('You have already voted on this poll.');
    return;
  }

  console.log('Voting for pollId:', this.pollId);
  console.log('Option Index:', optionIndex);

  this.pollService.voteOnPoll(this.pollId, optionIndex);
  this.hasVoted = true;
}

}
