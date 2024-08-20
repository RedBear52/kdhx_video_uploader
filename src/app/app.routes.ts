import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: UploadFormComponent },
];
