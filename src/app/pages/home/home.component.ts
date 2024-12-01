import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_POLLS } from '../../mock-polls';
import { PollingComponent } from '../../components/polling/polling.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, PollingComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  polls = MOCK_POLLS;
  newPoll: { 
    id: number;
    question: string;
    options: {
      text: string;
      votes: number
    }[] } = {
      id: 0,
      question: '',
      options: []
    };
  optionsInput = '';
  isCreatePollModalVisible = false;

  showCreatePollModal() {
    this.isCreatePollModalVisible = true;
    this.newPoll = { id: this.polls.length + 1, question: '', options: [] };
    this.optionsInput = '';
  }

  closeCreatePollModal() {
    this.isCreatePollModalVisible = false;
  }

  createPoll() {
    this.newPoll.options = this.optionsInput.split(',').map((option) => ({
      text: option.trim(),
      votes: 0,
    }));

    this.polls.push({ ...this.newPoll });

    this.closeCreatePollModal();
  }
}
