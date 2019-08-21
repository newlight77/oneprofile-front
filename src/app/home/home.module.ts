import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule} from '../shared/shared.module';
import { MaterialModule} from '../shared/material.module';
import { HomeLandingPageComponent } from './home-landing-page/home-landing-page.component';
import { HomeEventsPageComponent } from './home-events-page/home-events-page.component';
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [
    HomeLandingPageComponent,
    HomeEventsPageComponent,
    HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class HomeModule { }
