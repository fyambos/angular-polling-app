import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PollService } from '../../services/poll.service';

@Component({
  selector: 'app-upload-polls',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatCardModule],
  templateUrl: './upload-polls.component.html',
})
export class UploadPollsComponent {
  fileContent: string = '';

  constructor(private pollService: PollService, private snackBar: MatSnackBar) {}

  handleFileInput(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = e.target?.result as string;
      };
      reader.readAsText(file);
    }
  }

  processJson() {
    try {
      const polls = JSON.parse(this.fileContent);
      if (Array.isArray(polls)) {
        this.pollService.addPolls(polls).then(() => {
          this.snackBar.open('Polls added successfully!', 'Close', { duration: 3000 });
        }).catch((error) => {
          console.error(error);
          this.snackBar.open('Failed to add polls.', 'Close', { duration: 3000 });
        });
      } else {
        throw new Error('Invalid JSON format');
      }
    } catch (error) {
      console.error(error);
      this.snackBar.open('Invalid JSON file.', 'Close', { duration: 3000 });
    }
  }
}
