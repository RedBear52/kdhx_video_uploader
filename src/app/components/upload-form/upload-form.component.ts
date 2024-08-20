import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../../firebase.config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent {
  selectedFile: File | null = null;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

  constructor(private routes: Router) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Check if the file size exceeds the limit
      if (file.size > this.MAX_FILE_SIZE) {
        this.errorMessage = `File size exceeds the 2GB limit :: 
        
Your file size: (${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB)`;
        console.error('File size exceeds the 2GB limit');
        return;
      }

      // Proceed with the existing logic if the file size is within the limit
      this.selectedFile = file;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'No file selected';
      console.error('No file selected');
    }
  }

  async onSubmit(form: any): Promise<void> {
    const name = form.value.name;
    const email = form.value.email;
    const file = this.selectedFile;
    console.log('file submitted');

    if (file) {
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

      try {
        // Upload the video file to Firebase Storage
        const storageRef = ref(storage, `selfie-videos/${file.name}`);
        await uploadBytes(storageRef, file);

        // Get the public URL of the uploaded video
        const vid_url = await getDownloadURL(storageRef);

        // Create a new document in Firestore
        await addDoc(collection(db, 'selfie-videos'), {
          name: name,
          email: email,
          vid_url: vid_url,
        });

        this.successMessage = 'Video uploaded successfully!';
        console.log('Document successfully written!');
      } catch (error) {
        this.errorMessage = 'Error writing document: ' + error;
        console.error('Error writing document: ', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'No file selected';
      console.error('No file selected');
    }

    form.reset();
  }

  tellMe(): void {
    console.log('dashboard button clicked');
    this.routes.navigate(['/dashboard']);
  }
}
