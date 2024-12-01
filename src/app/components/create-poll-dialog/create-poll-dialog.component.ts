import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<CreatePollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.isEditMode = true; 
      this.question = data.question;
      this.options = data.options || [];
    }
  }

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

  updatePoll() {
    if (this.question && this.options.length >= 2) {
      this.dialogRef.close({ question: this.question, options: this.options });
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
