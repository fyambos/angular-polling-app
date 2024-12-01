// polling.component.ts
import { Component, Input } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePollDialogComponent } from '../create-poll-dialog/create-poll-dialog.component'; // Import dialog component
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Import ConfirmDialogComponent

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
  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePoll(); 
      }
    });
  }

  deletePoll() {
    this.pollService.deletePoll(this.poll.id); 
  }

  getVotePercentage(optionIndex: number): number {
    const totalVotes = this.poll.options.reduce((sum: number, option: any) => sum + option.votes, 0);
    const optionVotes = this.poll.options[optionIndex]?.votes || 0;
    return totalVotes > 0 ? parseFloat(((optionVotes / totalVotes) * 100).toFixed(1)) : 0;
  }

  getVotePercentageColor(optionIndex: number): string {
    const percentage = this.getVotePercentage(optionIndex);
    return `linear-gradient(to right, #3b82f6 ${percentage}%, #d1d5db ${percentage}%)`; // Tailwind colors: blue-500 and gray-400
  }

}
