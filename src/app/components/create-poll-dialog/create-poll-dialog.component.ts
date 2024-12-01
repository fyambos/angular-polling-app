import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-poll-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './create-poll-dialog.component.html',
})
export class CreatePollDialogComponent {
  question = '';
  options: string[] = [];
  optionInput = '';

  constructor(public dialogRef: MatDialogRef<CreatePollDialogComponent>) {}

  addOption() {
    if (this.optionInput && this.options.length < 4) {
      this.options.push(this.optionInput.trim());
      this.optionInput = '';
    }
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }

  createPoll() {
    if (this.question && this.options.length >= 2) {
      this.dialogRef.close({ question: this.question, options: this.options.map((text) => ({ text, votes: 0 })) });
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
