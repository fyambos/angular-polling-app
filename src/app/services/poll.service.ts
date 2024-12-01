import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, addDoc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id?: string;
  question: string;
  options: PollOption[];
}

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private pollsSubject = new BehaviorSubject<Poll[]>([]);
  polls$ = this.pollsSubject.asObservable();

  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {
    this.fetchPolls();
  }

  // fetch all polls from Firestore
  fetchPolls(): void {
    const pollsCollection = collection(this.firestore, 'polls');
    collectionData(pollsCollection, { idField: 'id' }).subscribe((polls) => {
      this.pollsSubject.next(polls as Poll[]);
    });
  }

  // add new poll to Firestore
  async addPoll(poll: Poll): Promise<void> {
    const pollsCollectionRef = collection(this.firestore, 'polls');
    try {
      // add a new poll to the collection
      await addDoc(pollsCollectionRef, poll);
      console.log("Poll added successfully:", poll);
    } catch (error) {
      console.error('Error adding poll:', error);
    }
  }

  // register a vote on a poll
  async voteOnPoll(pollId: string, optionIndex: number): Promise<void> {
    try {
      const pollDocRef = doc(this.firestore, `polls/${pollId}`);
      
      // retrieve the poll from Firestore
      const pollSnapshot = await getDoc(pollDocRef);  // get the poll data
      if (!pollSnapshot.exists()) {
        console.error('Poll not found!');
        this.snackBar.open('Poll not found.', 'OK', { duration: 2000 });
        return;
      }

      const pollData = pollSnapshot.data();  // poll data fetched
      const options = pollData?.['options'];  // get options from poll data

      // ensure options exist and the option index is valid
      if (!options || optionIndex < 0 || optionIndex >= options.length) {
        console.error('Invalid option index!');
        this.snackBar.open('Invalid option selected.', 'OK', { duration: 2000 });
        return;
      }

      // increment the vote count for the selected option
      options[optionIndex].votes++;

      // update the poll document in Firestore
      await updateDoc(pollDocRef, {
        options: options, // update options array with the incremented vote
      });
      this.snackBar.open('Vote registered!', 'OK', { duration: 2000 });
    } catch (error) {
      console.error('Error voting on poll:', error);
      this.snackBar.open('Failed to register vote. Please try again.', 'OK', { duration: 3000 });
    }
  }

  async updatePoll(pollId: string, updatedPoll: Poll): Promise<void> {
    const pollDocRef = doc(this.firestore, `polls/${pollId}`);
    await updateDoc(pollDocRef, {
      question: updatedPoll.question,
      options: updatedPoll.options,
    });

    this.snackBar.open('Poll updated!', 'OK', { duration: 2000 });
  }

  deletePoll(pollId: string) {
    const pollDocRef = doc(this.firestore, `polls/${pollId}`);
    deleteDoc(pollDocRef)
      .then(() => {
        console.log('Poll deleted successfully!');
        this.snackBar.open('Poll deleted', 'OK', { duration: 2000 });
      })
      .catch((error) => {
        console.error('Error deleting poll: ', error);
        this.snackBar.open('Error deleting poll', 'OK', { duration: 2000 });
      });
  }
}
