import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class PagesRoutingModule { }
