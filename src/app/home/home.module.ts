import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLandingPageComponent } from './home-landing-page/home-landing-page.component';
import { HomeCommunityPageComponent } from './home-community-page/home-community-page.component';
import { HomeEventsPageComponent } from './home-events-page/home-events-page.component';



@NgModule({
  declarations: [HomeLandingPageComponent, HomeCommunityPageComponent, HomeEventsPageComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
