import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './authGuard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    canActivate:[AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  providers: [AuthGuard], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
