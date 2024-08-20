import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
})
export class DashboardComponent implements OnInit {
  videos: Video[] = [];
  previewUrl: string | null = null;
  videoIds: string[] = [];

  constructor(private videoService: VideoService) {}

  async ngOnInit(): Promise<void> {
    this.videos = await this.fetchVideos();
    console.log(this.videos);
  }

  async fetchVideos(): Promise<any[]> {
    const querySnapshot = await getDocs(collection(db, 'selfie-videos'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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
    console.log('Delete video:', url);

    const id = await this.getVideoId(url);
    console.log('id:', id);

    this.videoService.deleteVideoFromFirestore(id);
    this.videos = this.videos.filter((video) => video.vid_url !== url);

    console.log('Video deleted:', id);
  }
}
