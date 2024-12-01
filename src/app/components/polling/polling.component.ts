import { Component, Input, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePollDialogComponent } from '../create-poll-dialog/create-poll-dialog.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './polling.component.html',
})
export class PollingComponent implements OnInit {
  @Input() poll: any;
  @Input() pollId!: string;
  hasVoted = false;

  constructor(private pollService: PollService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const votedPoll = localStorage.getItem('votedPoll_' + this.poll.id);
    if (votedPoll && JSON.parse(votedPoll).voted) {
      this.hasVoted = true;
    }
  }

  vote(optionIndex: number): void {
    if (this.hasVoted) {
      alert('You have already voted on this poll.');
      return;
    }

    this.pollService.voteOnPoll(this.pollId, optionIndex).then(() => {
      this.hasVoted = true;
      localStorage.setItem('votedPoll_' + this.poll.id, JSON.stringify({ pollId: this.poll.id, voted: true })); // Persist the vote state
    });
  }

  editPoll(): void {
    const dialogRef = this.dialog.open(CreatePollDialogComponent, {
      data: {
        question: this.poll.question,
        options: this.poll.options.map((option: any) => option.text),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pollService.updatePoll(this.pollId, result);
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePoll();
      }
    });
  }

  deletePoll(): void {
    this.pollService.deletePoll(this.poll.id);
  }

  getVotePercentage(optionIndex: number): number {
    const totalVotes = this.poll.options.reduce((sum: number, option: any) => sum + option.votes, 0);
    const optionVotes = this.poll.options[optionIndex]?.votes || 0;
    return totalVotes > 0 ? parseFloat(((optionVotes / totalVotes) * 100).toFixed(1)) : 0;
  }

  getVotePercentageColor(optionIndex: number): string {
    const percentage = this.getVotePercentage(optionIndex);
    return `linear-gradient(to right, #3b82f6 ${percentage}%, #d1d5db ${percentage}%)`; 
  }
}
