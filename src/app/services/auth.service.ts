import { Injectable } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../../firebase.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthManagementService {
  constructor() {}

  async onLogIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async onSignUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up');
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  monitorAuthState(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User is logged in', user);
          observer.next(true);
        } else {
          console.log('User is logged out');
          observer.next(false);
        }
      });
    });
  }

  async onLogOut() {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  }
}
