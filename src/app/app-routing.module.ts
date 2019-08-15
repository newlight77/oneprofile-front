import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { ErrorNotFoundComponent } from './core/error-not-found/error-not-found.component';
import { HomeLandingPageComponent } from './home/home-landing-page/home-landing-page.component';
import { HomeCommunityPageComponent } from './home/home-community-page/home-community-page.component';
import { HomeEventsPageComponent } from './home/home-events-page/home-events-page.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeLandingPageComponent, pathMatch: 'full' },
  { path: 'home/community', component: HomeCommunityPageComponent, pathMatch: 'full' },
  { path: 'home/events', component: HomeEventsPageComponent, pathMatch: 'full' },
  { path: '404', component: ErrorNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
