import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PollService, Poll } from '../../services/poll.service';
import { PollingComponent } from '../../components/polling/polling.component';
import { FormsModule } from '@angular/forms';
import { CreatePollDialogComponent } from '../../components/create-poll-dialog/create-poll-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PollingComponent, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  polls: Poll[] = [];

  constructor(private pollService: PollService, private dialog: MatDialog) {
    this.pollService.polls$.subscribe((polls) => {
      this.polls = polls;
    });
  }

  openCreatePollDialog() {
    const dialogRef = this.dialog.open(CreatePollDialogComponent);
    dialogRef.afterClosed().subscribe((result: Poll | null) => {
      if (result) {
        this.pollService.addPoll(result);
      }
    });
  }
}
