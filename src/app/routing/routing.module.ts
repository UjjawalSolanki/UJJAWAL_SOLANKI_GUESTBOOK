import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import { AuthGuardService } from '../service/auth-guard.service';
import {AuthService} from '../service/auth.service';
import {VisitorProfileComponent} from '../visitor-profile/visitor-profile.component';

const routes: Routes = [
  {path: '', redirectTo : '/dashboard', pathMatch : 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path : 'visitorprofile/:id', component: VisitorProfileComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuardService, AuthService],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
