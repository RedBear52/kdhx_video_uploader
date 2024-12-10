import { Injectable } from '@angular/core';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../../firebase.config';
import { db } from '../../../firebase.config';
import { getDocs, collection } from 'firebase/firestore';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor() {}

  async archiveVideo(id: string): Promise<void> {
    console.log('Archive video:', id);
    const docRef = doc(db, 'selfie-videos', id);
    await updateDoc(docRef, { isArchived: true });
    console.log('Video archived:', id);
  }

  async fetchVideos(): Promise<any[]> {
    const querySnapshot = await getDocs(collection(db, 'selfie-videos'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

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

    const docRef = doc(db, 'selfie-videos', id);
    await deleteDoc(docRef);
    console.log('Video deleted:', id);
  }
}
