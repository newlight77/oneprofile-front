import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeCommunityPageComponent } from './home-community-page/home-community-page.component';
import { HomeEventsPageComponent } from './home-events-page/home-events-page.component';
import { HomeLandingPageComponent } from './home-landing-page/home-landing-page.component';



export const routes: Routes = [
  { path: '', component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: HomeLandingPageComponent, pathMatch: 'full' },
      { path: 'community', component: HomeCommunityPageComponent, pathMatch: 'full' },
      { path: 'events', component: HomeEventsPageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'landing' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
