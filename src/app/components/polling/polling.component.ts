// polling.component.ts
import { Component, Input } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePollDialogComponent } from '../create-poll-dialog/create-poll-dialog.component'; // Import dialog component
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './polling.component.html',
})
export class PollingComponent {
  @Input() poll: any;
  @Input() pollId!: string;
  hasVoted = false;

  constructor(private pollService: PollService, private dialog: MatDialog) {}

  vote(optionIndex: number) {
    if (this.hasVoted) {
      alert('You have already voted on this poll.');
      return;
    }

    this.pollService.voteOnPoll(this.pollId, optionIndex);
    this.hasVoted = true;
  }

  editPoll() {
    const dialogRef = this.dialog.open(CreatePollDialogComponent, {
      data: {
        question: this.poll.question,
        options: this.poll.options.map((option: any) => option.text), // Pass existing options
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pollService.updatePoll(this.pollId, result); // Pass updated data
      }
    });
  }
  deletePoll() {
    this.pollService.deletePoll(this.poll.id); 
  }
}
