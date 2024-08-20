import { Injectable } from '@angular/core';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../../firebase.config';
import { db } from '../../../firebase.config';
import { getDocs, collection } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor() {}

  // deleteVideo(url: string): void {
  //   // get video id from url

  //   console.log('Delete video:', url);

  //   const storageRef = ref(storage, url);
  //   console.log('storageRef:', storageRef);
  //   console.log('storage:', storage);
  //   deleteObject(storageRef)
  //     .then(() => {
  //       console.log('File deleted successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting file:', error);
  //     });
  // }

  async deleteVideo(url: string): Promise<void> {
    console.log('Delete video:', url);

    const storageRef = ref(storage, url);
    console.log('storageRef:', storageRef);
    console.log('storage:', storage);

    try {
      // Delete the file from Firebase Storage
      await deleteObject(storageRef);
      console.log('File deleted successfully from storage');

      // Query Firestore to get the document ID based on the vid_url
      const q = query(
        collection(db, 'selfie-videos'),
        where('vid_url', '==', url)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnapshot) => {
        // Delete the document from Firestore
        await deleteDoc(doc(db, 'selfie-videos', docSnapshot.id));
        console.log('Video document deleted from Firestore:', docSnapshot.id);
      });
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  }

  async deleteVideoFromFirestore(id: string): Promise<void> {
    console.log('Delete video:', id);

    // Delete the document from Firestore
    const docRef = doc(db, 'selfie-videos', id);
    await deleteDoc(docRef);
    console.log('Video deleted:', id);
  }
}
