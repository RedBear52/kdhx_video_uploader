import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: UploadFormComponent },
  { path: 'auth-in', component: LogInComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
  },
];
