//user.service.ts
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { User } from '../models/user.model'; // Define a User interface

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async createUserProfile(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
  
    if (!userSnap.exists()) {
      const newUser = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(userRef, newUser);
    }
  }
  
  async createOrUpdateUserProfile(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
  
    if (userSnap.exists()) {
      // Merge new data with existing profile while preserving critical fields
      const existingData = userSnap.data() as User;
      const updatedData = {
        ...existingData,
        ...data, // New data overwrites only the provided fields
        role: existingData.role, // Preserve role
        updatedAt: new Date(),
      };
      await setDoc(userRef, updatedData, { merge: true });
    } else {
      // Create a new profile
      const newData = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(userRef, newData);
    }
  }
  
  

  async getUserProfile(uid: string): Promise<User | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as User) : null;
  }

  async updateUserProfile(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    await updateDoc(userRef, data);
  }

  async isAdmin(uid: string): Promise<boolean> {
    const userProfile = await this.getUserProfile(uid);
    return userProfile?.role === 'admin';
  }
}
