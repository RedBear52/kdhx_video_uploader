import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
})
export class DashboardComponent implements OnInit {
  videos: Video[] = [];
  previewUrl: string | null = null;
  videoIds: string[] = [];
  showArchived = false;

  constructor(private videoService: VideoService) {}

  async ngOnInit(): Promise<void> {
    this.videos = (await this.fetchVideos()).filter(
      (video) => !video.isArchived
    );
  }

  async fetchVideos(): Promise<any[]> {
    const querySnapshot = await getDocs(collection(db, 'selfie-videos'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async archiveVideo(videoId: string): Promise<any> {
    console.log('Archive video:', videoId);
    await this.videoService.archiveVideo(videoId);
    this.videos = this.videos.filter((video) => video.id !== videoId);
  }

  async toggleArchivedVideos(event: MatSlideToggleChange): Promise<void> {
    this.showArchived = event.checked;
    if (this.showArchived) {
      this.videos = await this.fetchVideos();
    } else {
      this.videos = (await this.fetchVideos()).filter(
        (video) => !video.isArchived
      );
    }
  }

  async showArchivedVideos(): Promise<Video[]> {
    this.videos = await this.fetchVideos();
    return this.videos;
  }

  previewVideo(url: string): void {
    if (url) {
      console.log('Previewing video URL:', url);
      this.previewUrl = url;
      this.showModal();
    } else {
      console.error('Invalid video URL:', url);
    }
  }

  showModal(): void {
    const modal = document.getElementById('videoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closePreview(): void {
    this.previewUrl = null;
    const modal = document.getElementById('videoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  async getVideoId(url: string | undefined): Promise<string> {
    const video = this.videos.find((video) => video.vid_url === url);
    if (video) {
      console.log(video);
      return video.id;
    }
    return '';
  }

  async deleteVideo(url: string): Promise<void> {
    // Show a confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this video?'
    );

    if (confirmed) {
      console.log('Delete video:', url);

      const id = await this.getVideoId(url);
      console.log('id:', id);

      this.videoService.deleteVideoFromFirestore(id);
      this.videos = this.videos.filter((video) => video.vid_url !== url);

      console.log('Video deleted:', id);
    } else {
      console.log('Video deletion canceled');
    }
  }
}
