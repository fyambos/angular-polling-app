import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, orderBy } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

export interface Poll {
  id?: string;
  question: string;
  options: { text: string; votes: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private pollsSubject = new BehaviorSubject<Poll[]>([]);
  polls$ = this.pollsSubject.asObservable();

  constructor(private firestore: Firestore,) {
    this.retrievePolls();
  }

  retrievePolls() {
    const pollsCollection = collection(this.firestore, 'polls');
    const pollsQuery = query(pollsCollection, orderBy('question'));
    collectionData(pollsQuery, { idField: 'id' }).subscribe((polls) => {
      this.pollsSubject.next(
        polls.map((poll) => ({
          id: poll['id'],
          question: poll['question'],
          options: poll['options'],
        }))
      );
    });
  }

  async addPoll(poll: Poll): Promise<void> {
    const pollsCollection = collection(this.firestore, 'polls');
    await addDoc(pollsCollection, poll);
  }
}
