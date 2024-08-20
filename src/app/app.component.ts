import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule,
    UploadFormComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'selfieLoad';

  closeVideo() {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
      videoContainer.style.display = 'none';
    }
  }
}
