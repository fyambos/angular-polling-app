import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PollService, Poll } from '../../services/poll.service';
import { PollingComponent } from '../../components/polling/polling.component';
import { FormsModule } from '@angular/forms';
import { CreatePollDialogComponent } from '../../components/create-poll-dialog/create-poll-dialog.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PollingComponent, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  polls: Poll[] = [];

  constructor(
    private pollService: PollService,
    private dialog: MatDialog,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.fetchPolls();
  }

  fetchPolls(): void {
    const pollsCollection = collection(this.firestore, 'polls');
    collectionData(pollsCollection, { idField: 'id' }).subscribe((polls) => {
      this.polls = polls.map((poll) => {
        const typedPoll = poll as Poll;
        if (!typedPoll.id || !typedPoll.question || !typedPoll.options) {
          console.error('Poll missing required fields:', typedPoll);
          return null;
        }
        return typedPoll;
      }).filter((poll): poll is Poll => poll !== null);
    });
  }
  
  openCreatePollDialog(): void {
    const dialogRef = this.dialog.open(CreatePollDialogComponent);
    dialogRef.afterClosed().subscribe((result: Poll | null) => {
      if (result) {
        this.pollService.addPoll(result);
      }
    });
  }
}
