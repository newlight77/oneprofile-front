import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { ErrorNotFoundComponent } from './core/error-not-found/error-not-found.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'guides', loadChildren: './guides/guides.module#GuidesModule' },
  { path: 'kits', loadChildren: './kits/kits.module#KitsModule' },
  { path: 'dojo', loadChildren: './dojo/dojo.module#DojoModule' },
  { path: '404', component: ErrorNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
